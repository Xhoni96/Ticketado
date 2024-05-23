import { useSearchParams } from "@remix-run/react";

export default function Index() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <div>
      {redirectTo ? (
        <div className="mt-3 text-xl">
          <p>Please Sign In first. </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          <h2>Hey good to have you here 👋</h2>
        </div>
      )}
    </div>
  );
}
