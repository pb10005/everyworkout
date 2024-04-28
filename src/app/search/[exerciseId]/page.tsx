import { type NextPage } from "next";
import { Heading, Navigation, SearchResultPage } from "../../../components";

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
