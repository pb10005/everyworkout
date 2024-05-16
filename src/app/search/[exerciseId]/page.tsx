import { type NextPage } from "next";
import {  Heading, Navigation, Container } from "../../../components/server";
import { SearchResultPage } from "./SearchResultPage";

const SearchByExerciseId: NextPage = () => {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <SearchResultPage />
        </Container>
      </main>
    </>
  );
};

export default SearchByExerciseId;
