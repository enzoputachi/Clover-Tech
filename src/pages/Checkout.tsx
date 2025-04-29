import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/api/api";
import  PaystackPop  from '@paystack/inline-js';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Check authentication on component mount
  if (!isAuthenticated) {
    navigate('/auth', { state: { returnUrl: '/checkout' } });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, amount } = Object.fromEntries(formData.entries()) as {
      email: string;
      amount: string;
    }

    // Validate input
    if (!email.trim() || !amount.trim() || Number(amount) <= 0) {
      toast({
        title: "Invalid input",
        description: "Please neter your email",
        // status: "error"
      })
      setLoading(false);
      return;
    }

    // Paystack amount in kobo
    const payload = { email, amount: Math.round(parseFloat(amount) * 100) }
    // console.log("Payload:", payload);

    try {
      const { data } = await api.post(`/api/v1/paystack/initialize`, payload);
      console.log("Initialization Response: ", data);

      const { reference, access_code } = data.data;
      console.log("access code:", access_code);
      

      const paystack = new PaystackPop();
      // Paystack.resumeTransaction(access_code);

      paystack.newTransaction({
        key: 'pk_test_73e068069c3d3111592867a42c07d8009aafe82f',
        email,
        amount: payload.amount,
        reference,
        onSuccess: async(transaction) => {
          try {
            const verifyRes = await api.get(`/api/v1/paystack/verify/${transaction.reference}`);

            console.log( 'TRANSACTION REFF:', transaction.reference);
            

            if (verifyRes.data.data.status === 'success') {
              toast({
                title: "Payment successful",
                description: 'Thank you1 confirmation email sent.',
                status: 'success',
              })
            } else {
              throw new Error('Payment not marked successful')
            }
          } catch (verifyError) {
            console.error('Verification error:', verifyError);
            toast({
              title: 'Verification failed',
              description: "could not verify payment. Contact support",
              status: 'error',
            })
          } finally {
            setLoading(false);
          }
        },
        onCancel: () => {
          toast({
            title: 'Payment cancelled',
            description: 'You closed the payment window.',
            status: 'info',
          });
          setLoading(false)
        }
      });
      
    } catch (error) {
      console.error(error?.response?.data || error.message);
      // setLoading(false)
      toast({
        title: "Initialization failed",
        description: error?.response?.data || 'Could not start payment. Please try again.',
        status: 'error',
      })
      return;
    }
    
    toast({
      title: "Order completed!",
      description: "Thank you for your purchase. You will receive an email confirmation shortly."
    });
    
    // clearCart();
    setLoading(false);
    // navigate('/courses');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <Button onClick={() => navigate('/courses')}>
          Browse Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  {/* <label className="block text-sm font-medium mb-1">Card Number</label> */}
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    defaultValue={user?.email}
                    name="email" 
                    required
                    placeholder="Enter your email"
                  />
                </div>
                {/* <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <Input 
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <Input 
                      required
                      placeholder="123"
                      maxLength={3}
                      type="password"
                    />
                  </div>
                </div> */}
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <Input
                    defaultValue={`${total.toFixed(2)}`}
                    name="amount" 
                    required
                    placeholder="Enter amount"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
                </Button>
                {!isAuthenticated && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    You'll need to log in or sign up to complete your purchase
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map(course => (
                  <div key={course._id} className="flex justify-between">
                    <span>{course.title}</span>
                    <span>{course.price}</span>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
