import { type NextPage } from "next";
import { Heading, Navigation, SearchResultPage } from "../../../src/components";

const SearchByExerciseId: NextPage = () => {
  return (
    <>
      <main>
        <Heading />
        <Navigation />
        <SearchResultPage></SearchResultPage>
      </main>
    </>
  );
};

export default SearchByExerciseId;
