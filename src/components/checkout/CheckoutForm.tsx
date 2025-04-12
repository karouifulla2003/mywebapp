// CheckoutForm.tsx
"use client";
import { useState } from "react";
import AddressForm from "./AddressForm";
import PaymentMethods from "./PaymentMethods";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    paymentMethod: "creditCard",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // simulate form submission
    setIsSubmitting(true);
    
    try {
      // simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form submitted successfully:", formData);
      
      // After successful submission, you might redirect or show success message
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Checkout</h2>
      
      {renderStepIndicator()}
      
      {step === 1 && (
        <>
          <AddressForm formData={formData} handleChange={handleChange} />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={nextStep}
              className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            >
              Continue to Payment
            </button>
          </div>
        </>
      )}
      
      {step === 2 && (
        <>
          <PaymentMethods 
            paymentMethod={formData.paymentMethod} 
            handleChange={handleChange} 
          />
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            >
              Back
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </>
      )}
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">4,980 DA</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-medium">500 DA</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Tax:</span>
          <span className="font-medium">237 DA</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200">
          <span>Total:</span>
          <span>5,717 DA</span>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;