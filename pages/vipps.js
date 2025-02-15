import VippsPaymentForm from "../components/VippsPaymentForm";
import OneTimePaymentForm from "../components/OneTimePaymentForm";

export default function VippsPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* <VippsPaymentForm /> */}
            <OneTimePaymentForm />
        </div>
    );
}
