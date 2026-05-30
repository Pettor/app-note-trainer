import type { AppSocialLinks } from "./AppSocialLinks";

export function useAppSocialLinks(homepageLink: string, githubLink: string, linkedInLink: string): AppSocialLinks {
  function handleOnHomepageClick(): void {
    window.open(homepageLink, "_blank", "noreferrer");
  }

  function handleOnGithubClick(): void {
    window.open(githubLink, "_blank", "noreferrer");
  }

  function handleOnLinkedInClick(): void {
    window.open(linkedInLink, "_blank", "noreferrer");
  }

  return {
    onHomepageClick: handleOnHomepageClick,
    onGithubClick: handleOnGithubClick,
    onLinkedInClick: handleOnLinkedInClick,
  };
}
