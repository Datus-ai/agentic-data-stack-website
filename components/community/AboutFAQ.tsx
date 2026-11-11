import { type Locale, text } from "@/lib/community";
const questions = [
  {
    question: { en: "What is the Agentic Data Stack community?", zh: "Agentic Data Stack 是什么社区？" },
    answer: { en: "An open, vendor-neutral, practice-driven technical community exploring Data Agents and the next generation of data infrastructure. We share architectures, real-world experience, open questions, and lessons from both successful and unsuccessful attempts.", zh: "这是一个开放、厂商中立、实践驱动的技术社区，关注 Data Agent 与下一代数据基础设施。我们交流架构设计、真实落地经验和未解决的问题，也分享成功与失败的尝试。" },
  },
  {
    question: { en: "Who is the community for?", zh: "哪些人适合参与？" },
    answer: { en: "Data Agent developers, data engineers, architects, AI researchers, analysts, enterprise practitioners, and open-source contributors. Anyone interested in how agents and data systems evolve together is welcome.", zh: "欢迎 Data Agent 开发者、数据工程师、架构师、AI 研究者、分析师、企业实践团队和开源贡献者参与，也欢迎所有关注 Agent 与数据系统共同演进的人。" },
  },
  {
    question: { en: "Who started the community, and is it vendor-neutral?", zh: "社区由谁发起？是否保持厂商中立？" },
    answer: { en: "DatusAI, NebulaGraph, and StarRocks co-initiated the community. Discussion is open to different technologies and organizations, with an emphasis on real problems, technical depth, and production practice rather than sales pitches.", zh: "社区由 DatusAI、NebulaGraph 与 StarRocks 共同发起。我们欢迎不同技术路线和组织参与，强调真实问题、技术深度与生产实践，避免将交流变成产品销售介绍。" },
  },
  {
    question: { en: "How can I take part?", zh: "我可以如何参与社区？" },
    answer: { en: "Attend an upcoming event, subscribe to the newsletter, submit a talk through our Call for Proposals, or contribute technical content and practical experience. Follow the event calendar for the latest gatherings.", zh: "你可以报名近期活动、订阅 Newsletter、通过 CFP 提交分享提案，或贡献技术内容与实践经验。最新活动安排会在网站与 Luma 日历中发布。" },
  },
  {
    question: { en: "Do I need to choose an event before proposing a talk?", zh: "投稿前必须确定参加哪场活动吗？" },
    answer: { en: "No. Submit through the shared Call for Proposals page. You can state a preferred event in your proposal or leave scheduling open. The organizing team will discuss the event, format, and timing with you after review. Proposals may be submitted in English or Chinese.", zh: "不需要。通过统一 CFP 页面提交即可，你可以说明希望参与的活动，也可以暂不确定，审核后再与社区沟通场次、形式与时间。提案可使用中文或英文提交。" },
  },
  {
    question: { en: "Are all events free, and what language are they held in?", zh: "活动都免费吗？使用什么语言？" },
    answer: { en: "Admission, location, language, and approval requirements are listed on each event page. The Hangzhou meetup is free, is held in Chinese, and requires registration approval. Other events may have different arrangements.", zh: "每场活动的费用、地点、语言和报名审核要求以对应活动页面为准。杭州 Meetup 免费、使用中文，报名需经主办方审核；其他活动可能有不同安排。" },
  },
  {
    question: { en: "Where can I find recordings, slides, and event recaps?", zh: "在哪里查看回放、Slides 和活动回顾？" },
    answer: { en: "Approved public materials will be linked from the event page and its recap when available. Publication depends on speaker permission and the materials provided; recordings or slides may not be available for every session.", zh: "经许可公开的资料会在整理完成后发布到活动详情和回顾页面。是否提供录像或 Slides 取决于讲者授权和实际资料，并非每场分享都会有完整回放。" },
  },
];
export default function AboutFAQ({locale}:{locale:Locale}) {
  return <section className="about-faq" id="about-faq" aria-labelledby="about-faq-title">
    <p className="eyebrow">FAQ</p>
    <h2 id="about-faq-title">{locale === "zh" ? "你可能还想了解" : "A few things you might be wondering"}</h2>
    <div className="about-faq-list">{questions.map((item,index)=><details key={index} className="about-faq-item">
      <summary>{text(item.question,locale)}</summary>
      <p>{text(item.answer,locale)}</p>
    </details>)}</div>
  </section>;
}
