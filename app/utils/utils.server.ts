import type { ZodIssue } from "zod";

export const zodErrorsToObj = (zodIssues: ZodIssue[]) => {
  let errors: { [key: string]: string } = {};

  zodIssues.forEach((issue) => {
    issue.path.forEach((path) => {
      errors[path] = issue.message;
    });
  });
  return errors;
};
