import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

// 17.1就是往这个C放一个C，如果isLoading，就转圈圈，否则就显示放进来的这个WrappedComponent
const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
