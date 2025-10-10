import Divider from "@/components/common/divider";

// With named components slots

const Header = ({ date, readingTimeMinutes, children }: { date?: string; readingTimeMinutes?: number; children: React.ReactNode }) => (
  <div className="flex flex-col items-start justify-between w-full mb-4">
    {children}
    <Divider className="my-4" />
    {(date || readingTimeMinutes) && (
      <div className="w-full flex justify-end font-light text-sm">
        {date && <>Last updated: {date}</>}
        {readingTimeMinutes ? (
          <>
            {date && " · "}
            ~{readingTimeMinutes} min read
          </>
        ) : null}
      </div>
    )}
  </div>
);

export default Header;
