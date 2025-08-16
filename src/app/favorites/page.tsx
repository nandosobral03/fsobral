import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import Favorites from "@/components/sections/favorites";

export default function FavoritesPage() {
  return (
    <>
      <LargeTitle alt="READS">FAVORITES</LargeTitle>
      <Divider />

      <Favorites />
      <Divider />
    </>
  );
}
