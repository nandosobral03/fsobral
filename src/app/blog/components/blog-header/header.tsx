import Divider from "@/components/common/divider";

// With named components slots

const Header = ({ date, children }: { date?: string; children: React.ReactNode }) => (
  <div className="flex flex-col items-start justify-between w-full mb-4">
    {children}
    <Divider className="my-4" />
    {date && <div className="w-full flex justify-end font-light text-sm">Last updated: {date}</div>}
  </div>
);

export default Header;
