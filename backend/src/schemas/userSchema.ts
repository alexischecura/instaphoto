import { z } from 'zod';

export const createUserSchema = z.object({
  fullName: z
    .string({
      required_error: 'Full name is required',
      invalid_type_error: 'Full name must be a string',
    })
    .max(255)
    .regex(/^[a-zA-Z ]*$/),
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .max(20)
    .regex(/^\S+$/),
  email: z
    .string({
      required_error: 'E-mail is required',
      invalid_type_error: 'E-mail must be a string',
    })
    .max(255)
    .email('Invalid email address'),

  password: z
    .string({
      required_error: 'Please provide your password',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password too long, please provide a shorter password'),
});

export type CreateUserType = Omit<
  z.infer<typeof createUserSchema>,
  'passwordConfirm'
>;

export const verificationCodeSchema = z.object({
  code: z.string({
    required_error: 'Verification Code is required',
  }),
});

export const loginUserSchema = z.object({
  identifier: z
    .string({
      required_error: 'e-mail or username is required',
      invalid_type_error: 'e-mail or username must be a string',
    })
    .max(255),
  password: z
    .string({
      required_error: 'Please provide your password',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password too long, please provide a shorter password'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Please provide your email',
      invalid_type_error: 'E-mail must be a string',
    })
    .max(255)
    .email('Invalid email address'),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: 'Please provide your password',
        invalid_type_error: 'Password must be a string',
      })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password too long, please provide a shorter password'),
    passwordConfirm: z.string({
      required_error: 'Please confirm your password',
    }),
  })
  .refine((user) => user.password === user.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export const createManyUsersSchema = z.object({
  users: z.array(createUserSchema),
});

export type CreateMayUsersType = Omit<
  z.infer<typeof createManyUsersSchema>,
  'passwordConfirm'
>;

export const usernameSchema = z.object({
  username: z.string(),
});

export const updateUserSchema = z.object({
  fullName: z
    .string({
      invalid_type_error: 'Full name must be a string',
    })
    .max(255)
    .regex(/^[a-zA-Z ]*$/)
    .optional(),
  username: z
    .string({
      invalid_type_error: 'Username must be a string',
    })
    .max(20)
    .regex(/^\S+$/)
    .optional(),
  phoneNumber: z
    .string({
      invalid_type_error: 'phoneNumber must be a string',
    })
    .max(255)
    .regex(/^\d+$/, {
      message: 'The phone number only have to contain numbers',
    })
    .optional(),
  profilePhoto: z
    .string({
      invalid_type_error: 'profilePhoto must me a string',
    })
    .max(255)
    .optional(),
  active: z
    .boolean({
      invalid_type_error: 'active must be a boolean',
    })
    .optional(),
  birdDate: z
    .date({
      invalid_type_error: 'birdDate must be a date',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'description must be a string',
    })
    .optional(),
});

export type UpdateUserType = z.infer<typeof updateUserSchema>;
