import { CreditCard, MapPin } from 'lucide-react'
import React from 'react'

const PaymentForm = ({payment, setPayment, handlePaymentSubmit}) => {


  return (
    <form onSubmit={handlePaymentSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <CreditCard className="w-5 h-5 mr-2" /> Payment
      </h2>
      
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Card number</label>
        <input
          type="text"
          value={payment.cardNumber}
          onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Card number"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Expiration date</label>
          <input
            type="text"
            value={payment.expiration}
            onChange={(e) => setPayment({ ...payment, expiration: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">CVV</label>
          <input
            type="text"
            value={payment.cvv}
            onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="CVV"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Name on card</label>
        <input
          type="text"
          value={payment.nameOnCard}
          onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name on card"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Pay Now
      </button>
    </form>
  )
}

export default PaymentForm