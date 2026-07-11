export interface FeatureClip {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  duration: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  tags: string[];
  completeDemo: {
    video: string;
    thumbnail: string;
    duration: string;
  };
  featureClips: FeatureClip[];
  gallery: GalleryImage[];
  pdf?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  email: string;
  github: string;
  resume: string;
  about: string;
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  name: "Zhou Yue",
  title: "UE5 Technical Designer",
  email: "your-email@example.com",
  github: "https://github.com/yourusername",
  resume: "/resume.pdf",
  about:
    "UE5 Technical Designer focused on gameplay systems, AI behavior, and UI architecture.",

  projects: [
    {
      id: "guiyuan",
      title: "归渊",
      subtitle: "UE5 第三人称剧情探索游戏",
      description:
        "一款基于UE5的第三人称剧情探索游戏，融合中国传统文化元素与沉浸式叙事体验。",
      cover: "/projects/guiyuan/cover.svg",
      tags: [
        "Gameplay",
        "Blueprint",
        "AI",
        "UI",
        "Material",
        "Save System",
      ],
      completeDemo: {
        video: "/projects/guiyuan/demo.svg",
        thumbnail: "/projects/guiyuan/cover.svg",
        duration: "3:45",
      },
      featureClips: [
        {
          id: "scanning",
          title: "Scanning System",
          description: "物品扫描与信息收集系统",
          thumbnail: "/projects/guiyuan/features/scanning.svg",
          video: "/projects/guiyuan/features/scanning.svg",
          duration: "0:25",
        },
        {
          id: "save",
          title: "Save System",
          description: "多槽位存档与自动保存系统",
          thumbnail: "/projects/guiyuan/features/save.svg",
          video: "/projects/guiyuan/features/save.svg",
          duration: "0:20",
        },
        {
          id: "ui-3d",
          title: "3D UI",
          description: "3D空间交互界面系统",
          thumbnail: "/projects/guiyuan/features/3d-ui.svg",
          video: "/projects/guiyuan/features/3d-ui.svg",
          duration: "0:30",
        },
        {
          id: "ai-behavior",
          title: "AI Behavior",
          description: "NPC行为树与感知系统",
          thumbnail: "/projects/guiyuan/features/ai.svg",
          video: "/projects/guiyuan/features/ai.svg",
          duration: "0:28",
        },
        {
          id: "combat",
          title: "Combat",
          description: "即时战斗系统与连招机制",
          thumbnail: "/projects/guiyuan/features/combat.svg",
          video: "/projects/guiyuan/features/combat.svg",
          duration: "0:22",
        },
        {
          id: "dialogue",
          title: "Dialogue",
          description: "分支对话与任务触发系统",
          thumbnail: "/projects/guiyuan/features/dialogue.svg",
          video: "/projects/guiyuan/features/dialogue.svg",
          duration: "0:26",
        },
      ],
      gallery: [
        {
          src: "/projects/guiyuan/gallery/screenshot-01.svg",
          alt: "归渊游戏场景截图",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan/gallery/screenshot-02.svg",
          alt: "归渊游戏场景截图",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan/gallery/screenshot-03.svg",
          alt: "归渊游戏场景截图",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan/gallery/blueprint-01.svg",
          alt: "Blueprint 系统架构",
          category: "Blueprint",
        },
        {
          src: "/projects/guiyuan/gallery/blueprint-02.svg",
          alt: "Blueprint 节点图",
          category: "Blueprint",
        },
        {
          src: "/projects/guiyuan/gallery/ui-01.svg",
          alt: "UI 界面设计",
          category: "UI",
        },
        {
          src: "/projects/guiyuan/gallery/flowchart-01.svg",
          alt: "系统流程图",
          category: "Flowchart",
        },
      ],
      pdf: "/projects/guiyuan/project.pdf",
    },
    {
      id: "guiyuan-minnan",
      title: "归渊（闽南版）",
      subtitle: "闽南文化特色版本",
      description:
        "归渊的闽南文化特别版本，融入闽南建筑、方言配音与地方民俗元素。",
      cover: "/projects/guiyuan-minnan/cover.svg",
      tags: [
        "Gameplay",
        "Blueprint",
        "UI",
        "Data",
        "Localization",
      ],
      completeDemo: {
        video: "/projects/guiyuan-minnan/demo.svg",
        thumbnail: "/projects/guiyuan-minnan/cover.svg",
        duration: "4:20",
      },
      featureClips: [
        {
          id: "localization",
          title: "Localization",
          description: "闽南方言本地化配音系统",
          thumbnail: "/projects/guiyuan-minnan/features/localization.svg",
          video: "/projects/guiyuan-minnan/features/localization.svg",
          duration: "0:30",
        },
        {
          id: "architecture",
          title: "Architecture",
          description: "闽南建筑风格场景还原",
          thumbnail: "/projects/guiyuan-minnan/features/architecture.svg",
          video: "/projects/guiyuan-minnan/features/architecture.svg",
          duration: "0:25",
        },
        {
          id: "culture-ui",
          title: "Culture UI",
          description: "闽南文化特色界面设计",
          thumbnail: "/projects/guiyuan-minnan/features/culture-ui.svg",
          video: "/projects/guiyuan-minnan/features/culture-ui.svg",
          duration: "0:20",
        },
      ],
      gallery: [
        {
          src: "/projects/guiyuan-minnan/gallery/screenshot-01.svg",
          alt: "闽南版游戏场景",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/screenshot-02.svg",
          alt: "闽南版游戏场景",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/ui-01.svg",
          alt: "闽南版 UI 界面",
          category: "UI",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/blueprint-01.svg",
          alt: "Blueprint 架构",
          category: "Blueprint",
        },
      ],
      pdf: "/projects/guiyuan-minnan/project.pdf",
    },
    {
      id: "gamejam",
      title: "48H GameJam",
      subtitle: "48小时极限游戏开发",
      description:
        "48小时内从零完成一款完整可玩游戏的极限开发挑战，涵盖核心玩法、关卡设计到打包发布全流程。",
      cover: "/projects/gamejam/cover.svg",
      tags: [
        "Gameplay",
        "Blueprint",
        "UI",
        "Level Design",
        "Rapid Prototyping",
      ],
      completeDemo: {
        video: "/projects/gamejam/demo.svg",
        thumbnail: "/projects/gamejam/cover.svg",
        duration: "2:30",
      },
      featureClips: [
        {
          id: "core-loop",
          title: "Core Loop",
          description: "核心玩法循环设计",
          thumbnail: "/projects/gamejam/features/core-loop.svg",
          video: "/projects/gamejam/features/core-loop.svg",
          duration: "0:20",
        },
        {
          id: "level",
          title: "Level Design",
          description: "快速关卡搭建与迭代",
          thumbnail: "/projects/gamejam/features/level.svg",
          video: "/projects/gamejam/features/level.svg",
          duration: "0:18",
        },
        {
          id: "ui-ux",
          title: "UI/UX",
          description: "极简游戏界面设计",
          thumbnail: "/projects/gamejam/features/ui-ux.svg",
          video: "/projects/gamejam/features/ui-ux.svg",
          duration: "0:15",
        },
      ],
      gallery: [
        {
          src: "/projects/gamejam/gallery/screenshot-01.svg",
          alt: "GameJam 游戏截图",
          category: "Screenshot",
        },
        {
          src: "/projects/gamejam/gallery/screenshot-02.svg",
          alt: "GameJam 游戏截图",
          category: "Screenshot",
        },
        {
          src: "/projects/gamejam/gallery/blueprint-01.svg",
          alt: "Blueprint 快速原型",
          category: "Blueprint",
        },
        {
          src: "/projects/gamejam/gallery/flowchart-01.svg",
          alt: "48H开发流程图",
          category: "Flowchart",
        },
      ],
      pdf: "/projects/gamejam/project.pdf",
    },
  ],
};
