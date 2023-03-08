# Things to improve after this app has all functionality to work

1. Check if you can improve the things with zod validation package. For exp. when zod schema parses with errors the response is not very friendly. try to check if there is a built in support for object syntax

2. Add debounce to autocomplete inputs

# Remix questions | pain points

- type inference from useLoader() hook. It infers type with SerializeObject<UndefinedToOptional> and is very annoying. Check if there's a solution to that
- clearing form modal after submit. Closing modal on submit after being sure that your request is successful
- Working with multiple forms in a single action sometimes you may have fields with the same name that you need to validate even though they belong to different forms. For e.g a input with name field can be for venue also for event. If one validation fails it will show error for both of them in the ui since they have the same name.
