import {createContext, useState, useContext } from "react";

export const myContext = createContext(null);

export const myContextProvider = ({children}) =>{
    <myContext.Provider>
        {children}
    </myContext.Provider>
}


// Step 1: Create a context
const SubmitDataContext = createContext();

// Step 2: Create a provider
export const SubmitDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Method to submit data to backend
  const submitDataToBackend = async (data) => {
    setIsLoading(true);
    try {
      // Your logic to send data to the backend goes here
      // For example:
      // const response = await fetch('your_backend_endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // const responseData = await response.json();
      // console.log(responseData);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <SubmitDataContext.Provider
      value={{
        isLoading,
        error,
        submitDataToBackend,
      }}
    >
      {children}
    </SubmitDataContext.Provider>
  );
};

// Step 3: Create a custom hook to consume the context
export const useSubmitData = () => useContext(myContext);
