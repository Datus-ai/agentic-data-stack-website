import type { Locale, Localized } from "@/lib/community";

export type CommunityPhoto = {
  src: string;
  alt: Localized;
  caption: Localized;
  illustrative?: boolean;
};

// Replace these explicitly labeled illustrative assets with approved community photographs later.
export const communityPhotos: CommunityPhoto[] = [
  { src: "/images/community/meetup-talk-illustration.jpg", illustrative: true,
    alt: { en: "AI-generated illustration of an engineer sharing a technical architecture with meetup participants", zh: "AI 生成示意图：工程师在技术社区活动中分享架构" },
    caption: { en: "Technical talks · Share architectures and lessons from practice.", zh: "技术分享 · 交流架构与实践经验。" } },
  { src: "/images/community/meetup-questions-illustration.jpg", illustrative: true,
    alt: { en: "AI-generated illustration of an attendee asking a question during a community discussion", zh: "AI 生成示意图：参与者在社区讨论中提问" },
    caption: { en: "Open questions · Explore real challenges together.", zh: "现场问答 · 一起讨论真实问题。" } },
  { src: "/images/community/meetup-conversation-illustration.jpg", illustrative: true,
    alt: { en: "AI-generated illustration of data practitioners exchanging ideas over coffee", zh: "AI 生成示意图：数据领域实践者在茶歇中交流" },
    caption: { en: "Meet your peers · Keep the conversation going.", zh: "自由交流 · 连接同行，让讨论继续。" } },
];

export default function CommunityPhotos({ locale, banner = false }: { locale: Locale; banner?: boolean }) {
  const photos = banner ? communityPhotos.slice(0, 1) : communityPhotos.slice(1, 2);
  if (!photos.length) return null;
  return <div className={`community-photos${banner ? " community-photos-banner" : " community-photos-single"}`}>
    {photos.map(photo => <figure key={photo.src}>
      <img src={photo.src} alt={photo.alt[locale]} width={banner ? 1440 : 800} height={banner ? 720 : 600} loading="lazy"/>
      <figcaption>{photo.caption[locale]}</figcaption>
    </figure>)}
  </div>;
}
