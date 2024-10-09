"use client";

import { useState } from "react";
import { CurrencyRupeeIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {
  // State variables
  const [loanAmount, setLoanAmount] = useState<number | "">(500000);
  const [interestRate, setInterestRate] = useState<number | "">(8.5);
  const [loanTenure, setLoanTenure] = useState<number | "">(20);

  const [monthlyEMI, setMonthlyEMI] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  // EMI Calculation Function
  const calculateEMI = () => {
    if (loanAmount && interestRate && loanTenure) {
      const principal = loanAmount;
      const annualInterest = interestRate;
      const years = loanTenure;

      const monthlyInterestRate = annualInterest / 12 / 100;
      const numberOfPayments = years * 12;

      const emi =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      const totalPayable = emi * numberOfPayments;
      const totalInterestPayable = totalPayable - principal;

      setMonthlyEMI(parseFloat(emi.toFixed(2)));
      setTotalInterest(parseFloat(totalInterestPayable.toFixed(2)));
      setTotalPayment(parseFloat(totalPayable.toFixed(2)));
    } else {
      alert("Please enter valid numbers in all fields.");
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-900 text-white text-center py-8">
        <h1 className="text-4xl font-bold">Loan EMI Calculator</h1>
        <p className="mt-2 text-xl">
          Calculate your monthly loan repayments instantly.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <section className="max-w-2xl mx-auto bg-white p-8 mt-8 rounded shadow">
          {/* Input Section */}
          <div>
            {/* Loan Amount */}
            <label className="block mb-2 font-semibold" htmlFor="loanAmount">
              Loan Amount (₹)
            </label>
            <div className="relative mb-4">
              <CurrencyRupeeIcon className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
              <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                placeholder="e.g., 5,00,000"
                className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Interest Rate */}
            <label className="block mb-2 font-semibold" htmlFor="interestRate">
              Interest Rate (% per annum)
            </label>
            <div className="relative mb-4">
              <span className="absolute left-3 top-3 text-gray-500">%</span>
              <input
                type="number"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                placeholder="e.g., 7.5"
                className="w-full pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Loan Tenure */}
            <label className="block mb-2 font-semibold" htmlFor="loanTenure">
              Loan Tenure (Years)
            </label>
            <div className="relative mb-4">
              <CalendarIcon className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
              <input
                type="number"
                id="loanTenure"
                value={loanTenure}
                onChange={(e) => setLoanTenure(parseFloat(e.target.value))}
                placeholder="e.g., 20"
                className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateEMI}
              className="w-full bg-green-600 text-white py-3 mt-4 rounded hover:bg-green-700 transition"
            >
              Calculate EMI
            </button>
          </div>

          {/* Result Section */}
          {monthlyEMI !== null && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                Your Monthly EMI is:
              </h2>
              <p className="text-3xl font-bold mb-6">
                ₹{monthlyEMI.toLocaleString("en-IN")}
              </p>

              <h3 className="text-xl font-semibold mb-2">
                Total Interest Payable:
              </h3>
              <p className="text-lg mb-4">
                ₹{totalInterest?.toLocaleString("en-IN")}
              </p>

              <h3 className="text-xl font-semibold mb-2">
                Total Payment (Principal + Interest):
              </h3>
              <p className="text-lg mb-4">
                ₹{totalPayment?.toLocaleString("en-IN")}
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        {/* Disclaimer */}
        <p className="mb-4 text-sm px-4">
          **Disclaimer:** This app is for informational purposes only and does
          not constitute financial advice. Please consult a financial
          professional before making any decisions.
        </p>

        {/* Developer Attribution */}
        <p className="mb-2">Developed by Ashish Jain</p>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/parmar94"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6 text-white hover:text-gray-400" />
          </a>
          <a
            href="https://www.linkedin.com/in/ashish-jain-dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6 text-white hover:text-gray-400" />
          </a>
        </div>
      </footer>
    </div>
  );
}
