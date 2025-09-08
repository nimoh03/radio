import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero/PageHero";
import EpisodeSearchBar from "@/components/SearchBar/EpisodeSearchBar";
import Episodes from "./Episodes";
import CallToAction from "@/components/Shared/CallToAction";
import NewsLetterForm2 from "@/components/Shared/NewsLetterForm2";

const EpisodesPage = () => {
  const [searchKeyword, setSearchKeyword] = useState([
    // You can remove these default search terms or keep them for initial load
    // "Storytelling",
    // "Horror", 
    // "Drama",
    // "Tech",
    // "Comedy",
  ]);

  const setWord = (word) => {
    // Avoid duplicate keywords
    if (!searchKeyword.includes(word)) {
      setSearchKeyword([...searchKeyword, word]);
    }
  };

  const removeSearchHistory = (removeWord) => {
    const newSearchKeyword = searchKeyword.filter(
      (item) => item !== removeWord
    );
    setSearchKeyword(newSearchKeyword);
  };

  // Optional: Clear all search keywords
  const clearAllSearchKeywords = () => {
    setSearchKeyword([]);
  };

  useEffect(() => {
    // You can add any side effects here when search keywords change
   
  }, [searchKeyword]);

  return (
    <>
      <PageHero
        pageTitle="Latest"
        highlightWord="Episodes"
        highlightColor="tcp-1"
        pb={"pb-lg-15 pb-10"}
      />
      <EpisodeSearchBar 
        setWord={setWord}
        searchKeywords={searchKeyword}
        clearAllKeywords={clearAllSearchKeywords}
      />
      <Episodes
        searchKeyword={searchKeyword}
        removeSearchHistory={removeSearchHistory}
      />
      <CallToAction bg="texture-bg-1 cta-alt-bg" />
      <NewsLetterForm2 />
    </>
  );
};

export default EpisodesPage;