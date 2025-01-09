import { useRouter } from "next/router";

export default function Test() {
  const router = useRouter();
  return (
    <div className="m-72">
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
    </div>
  );
}
