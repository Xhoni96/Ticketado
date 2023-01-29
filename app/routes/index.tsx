import { useSearchParams } from "@remix-run/react";

export default function Index() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <div>
      {redirectTo ? (
        <div className="mt-3 text-xl">
          <p>Sorry ma man. Gotta Sign In first. </p>
          <p>
            But don't worry it's pretty simple Just click the Sign in button on
            your right
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
