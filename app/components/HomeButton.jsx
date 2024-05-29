const HomeButton = () => (
  <div className="flex gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7m-9 9v-6h4v6m-5 0h6a2 2 0 002-2v-7a2 2 0 00-.59-1.41l-8-8a2 2 0 00-2.82 0l-8 8A2 2 0 002 10v7a2 2 0 002 2z"
      />
    </svg>
    <p>{"Home"}</p>
  </div>
);

export default HomeButton;
