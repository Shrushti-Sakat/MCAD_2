export type TrackSession = {
  title: string;
  items: string[];
};

export type TrackData = {
  trackId: string;
  badge: string;
  title: string;
  subtitle: string;
  duration: string;
  level: string;
  hours: string;
  fee: string;
  format?: string;
  output?: string;
  isFree: boolean;
  isContact: boolean;
  tagline: string;
  whatYouLearn: string[];
  sessions: TrackSession[];
  tools: string[];
  prerequisite: string;
  nextStep: string;
  audience?: string[];
};

export const trainingTracks: TrackData[] = [
  {
    trackId: "00",
    badge: "1 Day Free Workshop",
    title: "Robotics & Digital Twin Introduction Showcase",
    subtitle: "CAD · 3D Print · Simulation · Hardware · Software · Robot Demo",
    duration: "1 Day (~6 hrs)",
    level: "Open / College",
    hours: "~6 hrs",
    fee: "FREE",
    format: "Showcase / Demo",
    isFree: true,
    isContact: false,
    tagline: "See the full robotics pipeline live — from CAD to a working robot.",
    whatYouLearn: [
      "Understand what Digital Twin is and why it matters",
      "See a Digital Twin working live",
      "Understand the full robotics pipeline: CAD → Print → Simulate → Control",
      "See YOLO AI vision on a real robot",
      "Know which MCAD course to join next",
    ],
    sessions: [
      {
        title: "Session 1 — CAD Model Showcase",
        items: ["Live CAD model demonstration", "Part design walkthrough", "Assembly overview", "3D model review"],
      },
      {
        title: "Session 2 — 3D Printing Demo",
        items: ["FDM printing process explained", "Slicing demo", "Material overview (ABS / PLA Pro)", "Show printed robot parts"],
      },
      {
        title: "Session 3 — Robotic Simulation",
        items: ["What is a Digital Twin?", "Gazebo simulation live demo", "RViz visualization", "Digital Twin overview — what & why"],
      },
      {
        title: "Session 4 — Hardware & Electronics",
        items: ["MCAD 7-DOF robotic arm showcase", "ST3215 servo motors — feedback demo", "ESP32 / Micro-ROS intro", "Wiring & electronics overview"],
      },
      {
        title: "Session 5 — Software Integration",
        items: ["YOLO object detection live demo", "Digital Twin + Python control", "Mobile app robot control demo", "Dashboard telemetry view"],
      },
      {
        title: "Session 6 — Live Robot Demo",
        items: ["Full robot arm pick & place demo", "Digital Twin sync — real ↔ simulation", "Student Q&A", "Program announcements & next steps"],
      },
    ],
    tools: ["MCAD 7-DOF Arm", "Gazebo", "RViz", "YOLO", "ESP32", "Digital Twin"],
    prerequisite: "None — open to all",
    nextStep: "Join the 5-Day Foundation Course →",
    audience: [
      "Engineering students (ECE, ME, CS, IT)",
      "College faculty & HODs",
      "Anyone curious about robotics & Digital Twin",
      "Lab coordinators planning robotics setup",
    ],
  },
  {
    trackId: "01",
    badge: "5 Days Foundation",
    title: "Digital Twin Foundation for Complete Beginners",
    subtitle: "Ubuntu · Linux · Digital Twin Jazzy · Nodes · Topics · Services · TurtleSim",
    duration: "5 Days",
    level: "Zero → Basics",
    hours: "~30 hrs",
    fee: "Contact for pricing",
    isFree: false,
    isContact: false,
    tagline: "Start from zero and write your first working Digital Twin program.",
    whatYouLearn: [
      "Install and navigate Ubuntu 24.04 Linux from terminal",
      "Install Digital Twin Jazzy and understand workspace structure",
      "Write Python Digital Twin Nodes in minimal and OOP style",
      "Use Topics to communicate between nodes",
      "Use Services for request-response robot control",
      "Control TurtleSim — draw rectangles, circles, custom shapes",
      "Use Digital Twin CLI, rqt, rqt_graph to inspect system",
      "Build and run a full Digital Twin Python package",
    ],
    sessions: [
      {
        title: "Day 1 — Linux & Ubuntu Setup",
        items: ["What is Linux? Why Ubuntu?", "Install Ubuntu 24.04 on VirtualBox", "Terminal basics: ls, cd, mkdir, cp, mv, rm", "File permissions: chmod, sudo", "VS Code installation + Python extension", "Hands-on: navigate filesystem via terminal only"],
      },
      {
        title: "Day 2 — Digital Twin Introduction & Installation",
        items: ["What is Digital Twin? ROS 1 vs Digital Twin differences", "Digital Twin distributions — why Jazzy?", "Install Digital Twin Jazzy on Ubuntu 24.04", "Setup .bashrc environment", "Run your first Digital Twin command", "Understand the Digital Twin workspace and package structure"],
      },
      {
        title: "Day 3 — Nodes & Digital Twin Tools",
        items: ["What is a Digital Twin Node?", "Write a Python Node — minimal code", "Write a Python Node — with OOP structure", "Create a Digital Twin workspace + Python package", "Digital Twin CLI tools: Digital Twin node list, Digital Twin node info", "rqt & rqt_graph — visualize node communication", "Colcon build system"],
      },
      {
        title: "Day 4 — Topics — Robot Communication",
        items: ["What is a Digital Twin Topic? Publisher / Subscriber", "Write Python Publisher node", "Write Python Subscriber node", "TurtleSim introduction", "Drive TurtleSim with topic commands", "Monitor topics with Digital Twin topic echo, rqt_graph", "Hands-on: draw a straight line with TurtleSim"],
      },
      {
        title: "Day 5 — Services + TurtleSim Projects",
        items: ["What is a Digital Twin Service? Request / Response model", "Write Python Service Server and Client", "TurtleSim: teleport turtle using service call", "TurtleSim: change pen color and width", "Project 1: Draw a rectangle", "Project 2: Draw a circle", "Mini project: draw any custom shape on command", "Course wrap-up + path to 10-Day course"],
      },
    ],
    tools: ["Ubuntu 24.04 + VirtualBox", "Digital Twin Jazzy (Python)", "VS Code", "TurtleSim", "Digital Twin CLI", "rqt / rqt_graph", "Colcon build"],
    prerequisite: "None — absolute beginners welcome",
    nextStep: "Join the 10-Day Essentials Course →",
  },
  {
    trackId: "02",
    badge: "10 Days Essentials",
    title: "Digital Twin Essentials With Simulation Intro",
    subtitle: "All 5-Day Content + Parameters · Actions · Launch Files · Gazebo Intro · TurtleSim Projects",
    duration: "10 Days",
    level: "Basics → Intermediate",
    hours: "~60 hrs",
    fee: "Contact for pricing",
    isFree: false,
    isContact: false,
    tagline: "Go deeper — launch files, actions, custom messages, and your first simulation.",
    whatYouLearn: [
      "All 5-Day outcomes included",
      "Use Digital Twin Parameters with YAML config files",
      "Write and use Launch Files for multi-node systems",
      "Understand and implement Digital Twin Actions",
      "Create custom .msg and .srv types",
      "Record and replay data with Digital Twin Bags",
      "Introduction to Gazebo simulation",
      "TurtleSim projects: circle, spiral, custom paths on command",
    ],
    sessions: [
      { title: "Day 1 — Linux & Ubuntu Setup", items: ["Ubuntu 24.04 install on VirtualBox", "Terminal commands", "File permissions + sudo", "VS Code + Python extension setup", "Hands-on: terminal navigation challenge"] },
      { title: "Day 2 — Digital Twin Installation", items: ["What is Digital Twin? ROS1 vs Digital Twin", "Install Digital Twin Jazzy + .bashrc setup", "Digital Twin workspace & package structure", "Run first Digital Twin program", "Digital Twin CLI basics"] },
      { title: "Day 3 — Nodes & Digital Twin Tools", items: ["What is a Node?", "Python Node — minimal + OOP", "Create workspace + package", "Digital Twin CLI: node list, node info", "rqt_graph + colcon build"] },
      { title: "Day 4 — Topics — Communication", items: ["Publisher + Subscriber in Python", "Write C++ Publisher (intro)", "TurtleSim: drive with topics", "Digital Twin topic echo / list / info", "Hands-on: drive turtle in a pattern"] },
      { title: "Day 5 — Services", items: ["Service Server + Client (Python)", "TurtleSim teleport via service", "Pen color + width control", "Digital Twin service call from terminal", "Hands-on: draw rectangle with turtle"] },
      { title: "Day 6 — Parameters & YAML", items: ["What are Digital Twin Parameters?", "Using Parameters in Python Nodes", "YAML parameter files", "Load params via launch file", "TurtleSim: control speed via params"] },
      { title: "Day 7 — Launch Files", items: ["What is a Launch File?", "XML Launch Files", "Python Launch Files", "Remappings + namespaces", "Launch TurtleSim stack with one command"] },
      { title: "Day 8 — Digital Twin Actions", items: ["What are Actions? Goal / Feedback / Result", "Action Server in Python", "Action Client in Python", "TurtleSim: navigate to goal with action", "Digital Twin Bags: record & replay data"] },
      { title: "Day 9 — Custom Messages + Gazebo Intro", items: ["Create custom .msg files", "Custom .srv files", "Use custom msgs in Python nodes", "Gazebo simulator: what it is & why", "Spawn a simple robot in Gazebo (demo)"] },
      { title: "Day 10 — TurtleSim Projects + Wrap-Up", items: ["Project 1: Draw a circle", "Project 2: Draw a spiral", "Project 3: Draw any shape on command", "Project 4: Launch multi-turtle system", "Demo day + path to 15-Day course"] },
    ],
    tools: ["Ubuntu 24.04 + Digital Twin Jazzy", "Python (OOP nodes)", "TurtleSim", "Gazebo (intro)", "Digital Twin Bags", "Digital Twin CLI", "rqt", "Custom .msg / .srv"],
    prerequisite: "None — or completed 5-Day course",
    nextStep: "Join the 15-Day Core + AGV Course →",
  },
  {
    trackId: "03",
    badge: "15 Days Core + AGV",
    title: "Digital Twin Core + Simulation + AGV Introduction",
    subtitle: "All 10-Day + URDF · RViz · Gazebo · Custom Msgs · AGV Intro · Nav2 Basics",
    duration: "15 Days",
    level: "Intermediate",
    hours: "~90 hrs",
    fee: "Contact for pricing",
    isFree: false,
    isContact: true,
    tagline: "Model real robots in URDF, simulate them in Gazebo, and drive an AGV with Nav2.",
    whatYouLearn: [
      "Design robot models using URDF and XACRO",
      "Visualize robots in RViz with TF tree and joint states",
      "Simulate robot physics in Gazebo with camera and LiDAR",
      "Understand AGV architecture and differential drive",
      "Introduction to Nav2 navigation stack",
      "Send navigation goals programmatically from Python",
      "Mini-project: AGV navigating in a simulated Gazebo world",
      "All 10-Day outcomes included",
    ],
    sessions: [
      { title: "Days 1–10 — Full 10-Day Essentials Curriculum", items: ["Ubuntu → Linux → Digital Twin Jazzy → Nodes → Topics → Services", "Parameters → Launch Files → Actions → Custom Messages", "Digital Twin Bags · TurtleSim projects · Gazebo Intro"] },
      { title: "Day 11 — URDF Robot Modeling", items: ["What is URDF? Links and Joints", "Write a simple URDF from scratch", "Add visual and collision geometry (box, cylinder, mesh)", "Visualize URDF in RViz — joint state publisher"] },
      { title: "Day 12 — XACRO & TF Transforms", items: ["XACRO — parameterize your URDF", "Macros for repeated robot parts", "TF2 — transform frames explained", "TF tree in RViz · Broadcast custom TF frames"] },
      { title: "Day 13 — Gazebo Full Simulation", items: ["Spawn URDF robot in Gazebo", "Physics plugins — gravity, friction", "Add camera sensor in Gazebo", "Add LiDAR sensor · Publish sensor data to Digital Twin topics"] },
      { title: "Day 14 — AGV Introduction", items: ["What is an AGV? Real-world applications", "Differential drive robot model", "Drive AGV in Gazebo simulation", "Odometry topic — position tracking", "RViz: view AGV + sensor data live"] },
      { title: "Day 15 — Nav2 Intro + Final Project", items: ["Nav2 navigation stack overview", "Send navigation goals from Python", "Costmap basics", "AGV mini project: reach a target pose in Gazebo", "Demo day: student project presentations"] },
    ],
    tools: ["URDF / XACRO modeling", "RViz visualization", "Gazebo full simulation", "TF2 transforms", "Nav2 (intro)", "Camera + LiDAR sensors", "AGV differential drive"],
    prerequisite: "5-Day or 10-Day course completed, or equivalent Digital Twin knowledge",
    nextStep: "Join the 30-Day Advanced Course →",
  },
  {
    trackId: "04",
    badge: "30 Days Advanced",
    title: "Digital Twin + MoveIt 2 + Real Robot Integration",
    subtitle: "All 15-Day + FK/IK · MoveIt 2 · Digital Twin_control · ESP32 · Micro-ROS · Digital Twin · Nav2",
    duration: "30 Days",
    level: "Advanced",
    hours: "~180 hrs",
    fee: "Contact for pricing",
    isFree: false,
    isContact: true,
    tagline: "Control a real robot arm, build a Digital Twin, and deploy autonomous AGV navigation.",
    whatYouLearn: [
      "Complete MoveIt 2 — FK/IK, trajectory planning, collision avoidance",
      "Digital Twin_control — hardware abstraction and real joint-level control",
      "Connect Digital Twin to ESP32 via serial and Micro-ROS",
      "Integrate camera (OpenCV) and encoder sensors",
      "Build a live Digital Twin — Gazebo mirrors real robot in real time",
      "Nav2 full AGV navigation stack with costmaps and planners",
      "Advanced Digital Twin: Actions, Lifecycle Nodes, Executors",
      "Final project: Digital Twin robotic arm OR Nav2 AGV system",
    ],
    sessions: [
      { title: "Days 1–15 — Full 15-Day Core Content", items: ["Ubuntu · Linux · Digital Twin Jazzy complete setup", "Nodes (Python + OOP) · Topics · Services · Actions", "Parameters · Launch Files · Custom Messages · Digital Twin Bags", "URDF / XACRO → RViz → Gazebo · AGV intro + Nav2 basics"] },
      { title: "Days 16–22 — MoveIt 2 + Kinematics", items: ["Day 16: Digital Twin_control — joint trajectory controllers", "Day 17: MoveIt 2 — planning scene, MoveGroup interface", "Day 18: Forward Kinematics (FK)", "Day 19: Inverse Kinematics (IK)", "Day 20: Trajectory planning — OMPL, CHOMP planners", "Day 21: Collision avoidance — dynamic and static obstacles", "Day 22: Gazebo arm simulation + RViz arm visualization"] },
      { title: "Days 23–27 — Real Robot Hardware Integration", items: ["Day 23: Hardware setup — ESP32 / Arduino wiring", "Day 24: Serial communication — PySerial bridge", "Day 25: Micro-ROS — ESP32 runs as native Digital Twin node", "Day 26: Motor & servo control from Digital Twin", "Day 27: Sensor integration — OpenCV camera + encoder"] },
      { title: "Days 28–30 — Digital Twin + Final Project", items: ["Day 28: Digital Twin setup — URDF model synced with real robot", "Day 29: Real-time bidirectional sync — Gazebo ↔ physical arm", "Day 30: Final project: full Digital Twin OR intelligent AGV demo"] },
    ],
    tools: ["MCAD 7-DOF Arm (ST3215)", "ESP32 / Arduino Uno", "Waveshare servo controller", "Digital Twin Jazzy + Python + C++", "Gazebo · RViz · MoveIt 2", "Digital Twin_control · Nav2 · Micro-ROS", "PySerial · OpenCV"],
    prerequisite: "15-Day course completed",
    nextStep: "Join the 3-Month Professional Program →",
  },
  {
    trackId: "05",
    badge: "3 Months Professional",
    title: "Full Stack Robotics Professional Program",
    subtitle: "All 30-Day + YOLO AI · C++ Nodes · AGV Nav2 Full · Dashboard · Mobile App · Capstone",
    duration: "3 Months",
    level: "Professional",
    hours: "~300 hrs",
    fee: "Contact for pricing",
    isFree: false,
    isContact: true,
    tagline: "Production-ready robotics: AI vision, C++, Digital Twin, Dashboard, and certified capstone.",
    whatYouLearn: [
      "Full Python + C++ Digital Twin development — production-ready code",
      "Complete Digital Twin: URDF → Gazebo → Real Robot → Sync",
      "MoveIt 2 mastery: FK/IK, trajectory, collision avoidance",
      "YOLO + Digital Twin AI vision: detect, grasp, place pipeline",
      "Nav2 full AGV navigation with custom maps and planners",
      "CAD mesh import into URDF — custom robot design workflow",
      "Dashboard + Mobile App controller development",
      "Industry-grade capstone project + MCAD Certification",
    ],
    sessions: [
      {
        title: "Month 1 — Digital Twin Foundation → Simulation",
        items: [
          "Ubuntu + Digital Twin Jazzy + Python + C++ environment setup",
          "Nodes, Topics, Services, Actions, Parameters, Launch Files (Python + C++)",
          "TurtleSim: all shape projects · Custom Messages + Services",
          "URDF / XACRO — full robot model from scratch with meshes",
          "Gazebo — physics simulation, multi-sensor setup (camera, LiDAR, IMU)",
          "Digital Twin_control — joint controllers and hardware abstraction layer",
          "Digital Twin Bags, rqt_plot, Lifecycle Nodes, Executors, Components",
        ],
      },
      {
        title: "Month 2 — MoveIt 2 + Real Robot + Digital Twin",
        items: [
          "MoveIt 2 complete: FK, IK, trajectory planning, collision avoidance",
          "OMPL / CHOMP / STOMP planners — selection and tuning",
          "Robotic arm pick & place pipeline with MoveIt 2",
          "ESP32 / Arduino hardware integration via serial + Micro-ROS",
          "Real servo and motor control",
          "Sensor fusion: camera (OpenCV) + encoder + LiDAR point cloud",
          "Digital Twin: URDF ↔ Gazebo ↔ real robot — live bidirectional sync",
          "Nav2 full stack: global/local costmaps, AMCL, path planners, recovery behaviors",
          "AGV full autonomous navigation in simulated and real environments",
        ],
      },
      {
        title: "Month 3 — AI Vision + C++ + Dashboard + Capstone",
        items: [
          "YOLO object detection integrated with Digital Twin camera topics",
          "TensorRT optimization for Jetson Orin Nano deployment",
          "AI pick & place: camera detects object → plan grasp → arm moves",
          "C++ Digital Twin nodes: performance-critical control",
          "Advanced C++: OOP nodes, multi-threaded executors, callback groups",
          "Dashboard: telemetry UI — live joint states, camera feed, logs",
          "Mobile app: Android/iOS robot controller with custom branding",
          "Multi-robot basics: 2-arm coordination, AGV fleet namespacing",
          "Custom mesh design: CAD → STL → URDF link",
          "Capstone project + documentation + lab manual + demo day + certification",
        ],
      },
    ],
    tools: ["MCAD 7-DOF Arm + ESP32", "Jetson Orin Nano (YOLO)", "Orbbec depth camera (add-on)", "Digital Twin + MoveIt 2 + Nav2", "YOLO / TensorRT", "OpenCV"],
    prerequisite: "30-Day course completed",
    nextStep: "Join the 6-Month Expert Certification →",
  },
  {
    trackId: "06",
    badge: "6 Months Expert",
    title: "Expert Certification — Design · Build · Deploy",
    subtitle: "All 3-Month + Custom Meshes · Depth Camera · Multi-Robot · Industry Capstone · Certification",
    duration: "6 Months",
    level: "Expert",
    hours: "500+ hrs",
    fee: "Contact for pricing",
    output: "Certification + Product",
    isFree: false,
    isContact: true,
    tagline: "Design custom robots, deploy AI, lead multi-robot systems — and earn MCAD Expert Certification.",
    whatYouLearn: [
      "Design custom robot parts in CAD → import as URDF meshes",
      "Train custom YOLO models for specific use-case objects",
      "Integrate depth cameras — full 3D perception pipeline",
      "Multi-robot Digital Twin systems and AGV fleet coordination",
      "Complete industry-grade capstone with custom hardware",
      "Dashboard + Mobile App with custom client branding",
      "Full documentation: technical + user + lab experiment manual",
      "MCAD Expert Certification in Advanced Robotics & Digital Twin",
    ],
    sessions: [
      { title: "Months 1–3 — Complete 3-Month Professional Track", items: ["Full Ubuntu + Digital Twin + Python + C++ development stack", "TurtleSim → Gazebo → URDF → MoveIt 2 → Real Robot → Digital Twin", "YOLO AI vision, Nav2 full AGV, Dashboard, Mobile App", "All 5-Day, 10-Day, 15-Day, 30-Day content included"] },
      {
        title: "Month 4 — Custom Product Design — CAD Meshes to URDF",
        items: [
          "CAD design review — designing robot parts for 3D printing",
          "STL export from CAD + mesh preparation (simplification, watertight)",
          "Import custom STL meshes as URDF visual and collision links",
          "XACRO macros — fully parameterized robot model",
          "Custom gripper design (2-finger / 3-finger) + MoveIt 2 integration",
          "Custom robot arm configuration — tune DH parameters",
          "3D print workflow: FDM slicing, support structures, material selection",
          "Physical robot assembly with custom 3D-printed parts",
        ],
      },
      {
        title: "Month 5 — Advanced AI + Depth Camera + Multi-Robot",
        items: [
          "Custom YOLO training — label your own dataset, train on Jetson",
          "Depth camera integration: Orbbec Gemini Plus — RGB-D data",
          "Point cloud processing with PCL + Digital Twin",
          "3D grasp point estimation from depth data",
          "TensorRT deployment — optimize inference for Jetson Orin Nano",
          "Multi-robot Digital Twin: namespacing, separate URDF + controllers",
          "AGV fleet: 2 robots on shared map with independent Nav2 stacks",
          "Cloud-connected Digital Twin: remote monitoring via dashboard",
          "Voice command integration: mic array + speech-to-robot-action",
        ],
      },
      {
        title: "Month 6 — Industry Capstone + Certification",
        items: [
          "Student chooses capstone: robotic arm OR intelligent AGV OR custom robot",
          "Full custom hardware: CAD design → 3D print → assemble → program",
          "Complete Digital Twin for capstone robot",
          "AI integration: YOLO detection + grasp planning",
          "Dashboard: live telemetry, camera feed, control UI",
          "Mobile app: custom branded Android/iOS robot controller",
          "Technical documentation: user manual + lab guide + experiment sheets",
          "Project demo day — full system demonstration to panel",
          "MCAD Expert Certification in Robotics & Digital Twin",
        ],
      },
    ],
    tools: ["MCAD 7-DOF Arm + ESP32", "Jetson Orin Nano", "Orbbec Gemini Plus depth camera", "Digital Twin + MoveIt 2 + Nav2", "YOLO + TensorRT + PCL", "CAD + 3D Printing"],
    prerequisite: "3-Month Professional program completed",
    nextStep: "This is the final track — become a certified robotics expert! 🎓",
    audience: [
      "Final-year B.Tech / M.Tech students",
      "Researchers & lab engineers",
      "Startup founders building robotics products",
      "Engineers targeting Industry 4.0 roles",
      "Institutions setting up advanced labs",
    ],
  },
];

export function getTrackById(id: string): TrackData | undefined {
  return trainingTracks.find((t) => t.trackId === id);
}
