export interface FeatureClip {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  /** B站 BV号，如果设置则优先使用B站播放器（国内秒开） */
  bilibiliBvid?: string;
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
  trailer?: {
    video: string;
    thumbnail: string;
    duration: string;
    label?: string;
    /** B站 BV号，如果设置则优先使用B站播放器 */
    bilibiliBvid?: string;
  };
  completeDemo: {
    video: string;
    thumbnail: string;
    duration: string;
    /** B站 BV号，如果设置则优先使用B站播放器 */
    bilibiliBvid?: string;
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
      cover: "/projects/guiyuan/cover.png",
      tags: [
        "Gameplay",
        "Blueprint",
        "AI",
        "UI",
        "Material",
        "Save System",
      ],
      trailer: {
        video: "/projects/guiyuan/trailer.mp4",
        thumbnail: "/projects/guiyuan/cover.png",
        duration: "2:41",
        label: "Official Trailer",
      },
      completeDemo: {
        video: "/projects/guiyuan/demo.mp4",
        thumbnail: "/projects/guiyuan/cover.png",
        duration: "12:12",
      },
      featureClips: [
        {
          id: "throwing",
          title: "投掷功能",
          description: "物体投掷与抛物线轨迹判定",
          thumbnail: "",
          video: "/projects/guiyuan/features/guiyuan-feature-throwing.mp4",
          duration: "0:18",
        },
        {
          id: "execution",
          title: "处决",
          description: "近距离终结技与动画状态切换",
          thumbnail: "",
          video: "/projects/guiyuan/features/guiyuan-feature-execution.mp4",
          duration: "0:14",
        },
        {
          id: "assassination-qte",
          title: "暗杀 QTE 成功",
          description: "潜行接近后的快速反应事件与成功判定",
          thumbnail: "",
          video: "/projects/guiyuan/features/guiyuan-feature-assassination-qte.mp4",
          duration: "0:11",
        },
        {
          id: "enemy-freeze",
          title: "敌人 123 木头人冻结功能",
          description: "敌人行为暂停与冻结状态控制",
          thumbnail: "",
          video: "/projects/guiyuan/features/guiyuan-feature-enemy-freeze.mp4",
          duration: "0:14",
        },
        {
          id: "spacetime-traversal",
          title: "时空重叠穿越功能",
          description: "跨维度场景切换与时空穿越玩法",
          thumbnail: "",
          video: "/projects/guiyuan/features/guiyuan-feature-spacetime-traversal.mp4",
          duration: "0:43",
        },
      ],
      gallery: [
        {
          src: "/projects/guiyuan/gallery/screenshot-01.png",
          alt: "归渊游戏场景截图",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan/gallery/screenshot-02.png",
          alt: "归渊游戏场景截图",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan/gallery/screenshot-03.png",
          alt: "归渊游戏场景截图",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan/gallery/screenshot-04.png",
          alt: "归渊游戏场景截图",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan/gallery/blueprint-01.png",
          alt: "Blueprint 系统架构",
          category: "Blueprint",
        },
        {
          src: "/projects/guiyuan/gallery/blueprint-02.png",
          alt: "Blueprint 节点图",
          category: "Blueprint",
        },
        {
          src: "/projects/guiyuan/gallery/blueprint-03.png",
          alt: "Blueprint 节点图",
          category: "Blueprint",
        },
        {
          src: "/projects/guiyuan/gallery/blueprint-04.png",
          alt: "Blueprint 节点图",
          category: "Blueprint",
        },
        {
          src: "/projects/guiyuan/gallery/ui-01.png",
          alt: "UI 界面设计",
          category: "UI",
        },
        {
          src: "/projects/guiyuan/gallery/ui-02.png",
          alt: "UI 界面设计",
          category: "UI",
        },
        {
          src: "/projects/guiyuan/gallery/ui-03.png",
          alt: "UI 界面设计",
          category: "UI",
        },
        {
          src: "/projects/guiyuan/gallery/ui-04.jpg",
          alt: "UI 界面设计",
          category: "UI",
        },
        {
          src: "/projects/guiyuan/gallery/flowchart-01.png",
          alt: "系统流程图",
          category: "Flowchart",
        },
        {
          src: "/projects/guiyuan/gallery/flowchart-02.png",
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
      cover: "/projects/guiyuan-minnan/cover.png",
      tags: [
        "Gameplay",
        "Blueprint",
        "UI",
        "Data",
        "Localization",
      ],
      trailer: {
        video: "/projects/guiyuan-minnan/trailer.mp4",
        thumbnail: "/projects/guiyuan-minnan/cover.png",
        duration: "3:14",
        label: "Official Trailer",
      },
      completeDemo: {
        video: "/projects/guiyuan-minnan/demo.mp4",
        thumbnail: "/projects/guiyuan-minnan/cover.png",
        duration: "1:43",
      },
      featureClips: [
        {
          id: "possession",
          title: "夺舍时刻+切换选择敌人+激活敌人面板",
          description: "附身控制、目标切换与敌人面板激活",
          thumbnail: "",
          video: "/projects/guiyuan-minnan/features/guiyuan-minnan-feature-possession.mp4",
          duration: "0:11",
        },
        {
          id: "near-death-heal",
          title: "受伤濒死回血",
          description: "低生命值状态下的恢复与生存系统",
          thumbnail: "",
          video: "/projects/guiyuan-minnan/features/guiyuan-minnan-feature-near-death-heal.mp4",
          duration: "0:33",
        },
        {
          id: "drone-interaction",
          title: "无人机实机 无人机交互",
          description: "无人机实体操控与场景交互",
          thumbnail: "",
          video: "/projects/guiyuan-minnan/features/guiyuan-minnan-feature-drone-interaction.mp4",
          duration: "0:31",
        },
        {
          id: "save-system",
          title: "存档系统",
          description: "游戏进度存档、读取与管理",
          thumbnail: "",
          video: "/projects/guiyuan-minnan/features/guiyuan-minnan-feature-save-system.mp4",
          duration: "2:17",
        },
      ],
      gallery: [
        {
          src: "/projects/guiyuan-minnan/gallery/screenshot-01.png",
          alt: "闽南版游戏场景",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/screenshot-02.png",
          alt: "闽南版游戏场景",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/screenshot-03.png",
          alt: "闽南版游戏场景",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/screenshot-04.png",
          alt: "闽南版游戏场景",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/screenshot-05.png",
          alt: "闽南版游戏场景",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/screenshot-06.png",
          alt: "闽南版游戏场景",
          category: "Screenshot",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/ui-01.png",
          alt: "闽南版 UI 界面",
          category: "UI",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/ui-02.png",
          alt: "闽南版 UI 界面",
          category: "UI",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/ui-03.png",
          alt: "闽南版 UI 界面",
          category: "UI",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/ui-04.png",
          alt: "闽南版 UI 界面",
          category: "UI",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/blueprint-01.png",
          alt: "Blueprint 架构",
          category: "Blueprint",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/blueprint-02.png",
          alt: "Blueprint 架构",
          category: "Blueprint",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/blueprint-03.png",
          alt: "Blueprint 架构",
          category: "Blueprint",
        },
        {
          src: "/projects/guiyuan-minnan/gallery/blueprint-04.png",
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
      cover: "/projects/gamejam/cover.png",
      tags: [
        "Gameplay",
        "Blueprint",
        "UI",
        "Level Design",
        "Rapid Prototyping",
      ],
      trailer: {
        video: "/projects/gamejam/trailer.svg",
        thumbnail: "/projects/gamejam/cover.png",
        duration: "1:00",
        label: "Trailer",
      },
      completeDemo: {
        video: "/projects/gamejam/demo.svg",
        thumbnail: "/projects/gamejam/cover.png",
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
          src: "/projects/gamejam/gallery/screenshot-01.jpg",
          alt: "GameJam 游戏截图",
          category: "Screenshot",
        },
        {
          src: "/projects/gamejam/gallery/screenshot-02.png",
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
