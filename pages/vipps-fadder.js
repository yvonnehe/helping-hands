//import VippsPaymentForm from "../components/VippsPaymentForm";
import RecurringPaymentForm from "../components/RecurringPaymentForm";

export default function VippsFadderPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* <VippsPaymentForm /> */}
            <RecurringPaymentForm />
        </div>
    );
}
