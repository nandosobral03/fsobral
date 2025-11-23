import LargeTitle from "@/components/common/large-title";
import Favorites from "@/components/sections/favorites";
import FavoritesInfo from "./favorites-info";

export default function FavoritesPage() {
  return (
    <>
      <div className="mb-20">
        <LargeTitle alt="READS" animation="dna">
          FAVORITES
        </LargeTitle>
      </div>

      <FavoritesInfo />

      <div className="h-16" />

      <Favorites />
    </>
  );
}
