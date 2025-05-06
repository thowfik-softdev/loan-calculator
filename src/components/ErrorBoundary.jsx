import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? (
      <h2>Oops! Something went wrong.</h2>
    ) : (
      this.props.children
    );
  }
}
