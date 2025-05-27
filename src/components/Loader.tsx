

export default function Loader({ width }: { width?: string }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`border-t-4 border-b-4 border-yellowButton rounded-full animate-spin`}
        style={{ width: width || "50px", height: width || "50px" }}
      ></div>
    </div>
  );
}
