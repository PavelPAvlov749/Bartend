import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}


class ErrorBoundary extends Component<Props, State>
{
    state = {
        hasError: false
    }
    public static getDerivedStateFromError(error: Error) {
        return { error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }
    render() {
        const error = this.state;

        if (error) {
            return (
                <section className="error-page">
                    <span>Something went wrong</span>
                </section>
            )
        }
        else {
            return this.props.children;
        }
    }
};


export default ErrorBoundary;