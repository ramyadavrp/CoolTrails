// ---------- Types ----------
export interface LoginFields {
  email: string;
  password: string;
}

export interface ErrorFields {
  email?: string;
  password?: string;
}

// ---------- Validation Function ----------
export const validate = (fields: LoginFields): ErrorFields => {
  let errors: ErrorFields = {};

  // Email validation
  if (!fields.email) {
    errors.email = "Email is required";
  } 
//   else if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
//     errors.email = "Invalid email format";
//   }

  // Password validation
  if (!fields.password) {
    errors.password = "Password is required";
  }
//   } else if (fields.password.length < 6) {
//     errors.password = "Password must be at least 6 characters";
//   }

  return errors;
};
