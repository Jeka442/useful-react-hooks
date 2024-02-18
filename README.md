
# ReactUseFormDevtool

The ReactUseFormDevtool component is designed to be seamlessly integrated into your React application, providing real-time inspection capabilities for React Hook Form. Engineered for exclusive use in a local development environment, this tool enhances your debugging process by offering immediate insights into the behavior and state of React Hook Form. Its local-only operation ensures a secure and optimized development workflow, allowing for efficient analysis and improvement of form handling within React applications.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`methods` : UseFormReturn<any, any> ( comes from useForm() )

`hostnames` : ( string[] ) The ReactUseFormDevtool component supports custom hostnames, allowing its use in QA environments and beyond localhost. This update broadens its utility, enabling seamless debugging and integration across various development stages.


## Usage/Examples

```javascript

//Demo

import { useForm, FormProvider } from "react-hook-form";
import "./App.css";
import { ReactUseFormDevtool } from "useform-devtool";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
}

function App() {
  const methods = useForm<IFormInput>({
    mode: "all",
  });

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            console.log({ data });
          })}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <ReactUseFormDevtool methods={methods}  />
          <label>First Name</label>
          <input
            {...methods.register("firstName", {
              required: { value: true, message: "is required" },
              min: { value: 5, message: "short" },
            })}
          />
          <label>Last Name</label>
          <input
            {...methods.register("lastName", {
              required: { value: true, message: "is required" },
              min: { value: 5, message: "short" },
            })}
          />
          <label>Gender Selection</label>
          <select {...methods.register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <input type="submit" />
        </form>
      </FormProvider>
    </>
  );
}

export default App;



```

