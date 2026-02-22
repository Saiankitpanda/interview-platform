// ═══════════════════════════════════════════════════════════
// 90-Day Interview Preparation Study Plan
// ═══════════════════════════════════════════════════════════

export const REWARDS = [
    { day: 7, icon: '🏅', title: 'First Week Champion', desc: 'Completed your first week!' },
    { day: 14, icon: '🔥', title: 'Two-Week Streak', desc: 'You\'re building momentum!' },
    { day: 21, icon: '⚡', title: 'Array & String Master', desc: 'Foundations are solid!' },
    { day: 28, icon: '⭐', title: 'DSA Warrior', desc: 'Month 1 complete — DSA basics covered!' },
    { day: 35, icon: '🧠', title: 'DP Thinker', desc: 'Dynamic programming unlocked!' },
    { day: 42, icon: '💡', title: 'Pattern Spotter', desc: 'You see patterns everywhere now!' },
    { day: 49, icon: '🏗️', title: 'OOP Architect', desc: 'Low-level design foundations built!' },
    { day: 56, icon: '🏆', title: 'Design Pattern Pro', desc: 'Month 2 done — LLD ready!' },
    { day: 63, icon: '🌐', title: 'System Thinker', desc: 'High-level design fundamentals!' },
    { day: 70, icon: '📐', title: 'Scale Master', desc: 'You think in distributed systems!' },
    { day: 77, icon: '💎', title: 'System Architect', desc: 'Full stack design knowledge!' },
    { day: 84, icon: '🎤', title: 'Story Teller', desc: 'Behavioral prep complete!' },
    { day: 90, icon: '👑', title: 'Interview Ready!', desc: 'You\'ve completed the 90-day journey!' }
];

export const STUDY_PLAN = [
    // ═══════════════ PHASE 1: DSA FOUNDATIONS (Weeks 1-4) ═══════════════
    // ─── Week 1: Arrays & Strings ──────────────────────────
    {
        week: 1, theme: 'Arrays & Strings', phase: 'DSA Foundations', phaseColor: 'indigo',
        days: [
            { day: 1, title: 'Arrays Basics', tasks: ['Learn array operations (insert, delete, traverse)', 'Solve: Two Sum (Easy)', 'Solve: Remove Duplicates from Sorted Array', 'Read: Big-O notation refresher'], category: 'dsa', time: '3-4 hrs' },
            { day: 2, title: 'Prefix Sums & Kadane\'s', tasks: ['Learn prefix sum technique', 'Solve: Maximum Subarray (Kadane\'s Algorithm)', 'Solve: Product of Array Except Self', 'Practice: Running sum variations'], category: 'dsa', time: '3-4 hrs' },
            { day: 3, title: 'Two Pointers', tasks: ['Learn two-pointer technique', 'Solve: Container With Most Water', 'Solve: 3Sum', 'Solve: Trapping Rain Water'], category: 'dsa', time: '3-4 hrs' },
            { day: 4, title: 'Sliding Window', tasks: ['Learn sliding window pattern', 'Solve: Minimum Window Substring', 'Solve: Longest Substring Without Repeating Characters', 'Solve: Subarray with Target Sum'], category: 'dsa', time: '3-4 hrs' },
            { day: 5, title: 'String Manipulation', tasks: ['String operations and patterns', 'Solve: Valid Anagram', 'Solve: Group Anagrams', 'Solve: Longest Palindromic Substring'], category: 'dsa', time: '3-4 hrs' },
            { day: 6, title: 'Hashing & HashMaps', tasks: ['Deep dive into hash maps', 'Solve: First Unique Character', 'Solve: Top K Frequent Elements', 'Solve: Subarray Sum Equals K'], category: 'dsa', time: '3-4 hrs' },
            { day: 7, title: '📝 Week 1 Revision', tasks: ['Revise all array & string patterns', 'Re-solve 3 hardest problems from this week', 'Write notes on patterns learned', 'Time yourself on 2 random problems'], category: 'revision', time: '2-3 hrs' }
        ]
    },
    // ─── Week 2: Linked Lists, Stacks & Queues ────────────
    {
        week: 2, theme: 'Linked Lists, Stacks & Queues', phase: 'DSA Foundations', phaseColor: 'indigo',
        days: [
            { day: 8, title: 'Singly Linked List', tasks: ['Implement linked list from scratch', 'Solve: Reverse Linked List', 'Solve: Merge Two Sorted Lists', 'Solve: Remove Nth Node From End'], category: 'dsa', time: '3-4 hrs' },
            { day: 9, title: 'Linked List Patterns', tasks: ['Fast & slow pointer technique', 'Solve: Linked List Cycle Detection', 'Solve: Find Middle of Linked List', 'Solve: Palindrome Linked List'], category: 'dsa', time: '3-4 hrs' },
            { day: 10, title: 'Advanced Linked Lists', tasks: ['Doubly linked lists', 'Solve: LRU Cache (HashMap + DLL)', 'Solve: Merge K Sorted Lists', 'Solve: Copy List with Random Pointer'], category: 'dsa', time: '4 hrs' },
            { day: 11, title: 'Stacks', tasks: ['Stack implementation & applications', 'Solve: Valid Parentheses', 'Solve: Min Stack', 'Solve: Evaluate Reverse Polish Notation'], category: 'dsa', time: '3-4 hrs' },
            { day: 12, title: 'Monotonic Stack', tasks: ['Learn monotonic stack pattern', 'Solve: Next Greater Element', 'Solve: Daily Temperatures', 'Solve: Largest Rectangle in Histogram'], category: 'dsa', time: '3-4 hrs' },
            { day: 13, title: 'Queues & Deques', tasks: ['Queue implementations', 'Solve: Implement Queue using Stacks', 'Solve: Sliding Window Maximum', 'Solve: Design Circular Queue'], category: 'dsa', time: '3-4 hrs' },
            { day: 14, title: '📝 Week 2 Revision', tasks: ['Revise linked list, stack, queue patterns', 'Re-solve LRU Cache from scratch', 'Practice 3 timed problems', 'Write down key templates (reverse LL, monotonic stack)'], category: 'revision', time: '2-3 hrs' }
        ]
    },
    // ─── Week 3: Trees & Binary Search ────────────────────
    {
        week: 3, theme: 'Trees & Binary Search', phase: 'DSA Foundations', phaseColor: 'indigo',
        days: [
            { day: 15, title: 'Binary Tree Basics', tasks: ['Tree traversals (inorder, preorder, postorder)', 'Solve: Maximum Depth of Binary Tree', 'Solve: Same Tree', 'Solve: Invert Binary Tree'], category: 'dsa', time: '3-4 hrs' },
            { day: 16, title: 'BFS on Trees', tasks: ['Level-order traversal', 'Solve: Binary Tree Level Order Traversal', 'Solve: Right Side View', 'Solve: Zigzag Level Order'], category: 'dsa', time: '3-4 hrs' },
            { day: 17, title: 'BST Operations', tasks: ['BST insert, search, delete', 'Solve: Validate BST', 'Solve: Kth Smallest Element in BST', 'Solve: Lowest Common Ancestor of BST'], category: 'dsa', time: '3-4 hrs' },
            { day: 18, title: 'Tree DFS Patterns', tasks: ['Path sum patterns', 'Solve: Balanced Binary Tree', 'Solve: Diameter of Binary Tree', 'Solve: Serialize and Deserialize Binary Tree'], category: 'dsa', time: '3-4 hrs' },
            { day: 19, title: 'Binary Search', tasks: ['Binary search template and variations', 'Solve: Search in Rotated Sorted Array', 'Solve: Find Minimum in Rotated Array', 'Solve: Median of Two Sorted Arrays'], category: 'dsa', time: '3-4 hrs' },
            { day: 20, title: 'Advanced Binary Search', tasks: ['Binary search on answer', 'Solve: Koko Eating Bananas', 'Solve: Split Array Largest Sum', 'Solve: Capacity to Ship Packages'], category: 'dsa', time: '3-4 hrs' },
            { day: 21, title: '📝 Week 3 Revision', tasks: ['Revise tree traversals and BST patterns', 'Re-solve Serialize Tree, Median of Arrays', 'Code binary search template from memory', 'Timed practice: 2 tree + 1 binary search problems'], category: 'revision', time: '2-3 hrs' }
        ]
    },
    // ─── Week 4: Graphs & Recursion ───────────────────────
    {
        week: 4, theme: 'Graphs & Recursion/Backtracking', phase: 'DSA Foundations', phaseColor: 'indigo',
        days: [
            { day: 22, title: 'Graph Basics & BFS', tasks: ['Graph representations (adj list/matrix)', 'Solve: Number of Islands', 'Solve: Clone Graph', 'Solve: Rotting Oranges (multi-source BFS)'], category: 'dsa', time: '3-4 hrs' },
            { day: 23, title: 'Graph DFS', tasks: ['DFS on graphs', 'Solve: Pacific Atlantic Water Flow', 'Solve: Surrounded Regions', 'Solve: Number of Connected Components'], category: 'dsa', time: '3-4 hrs' },
            { day: 24, title: 'Topological Sort', tasks: ['Kahn\'s algorithm & DFS topo sort', 'Solve: Course Schedule', 'Solve: Course Schedule II', 'Solve: Alien Dictionary'], category: 'dsa', time: '3-4 hrs' },
            { day: 25, title: 'Shortest Path', tasks: ['Dijkstra\'s algorithm', 'Solve: Network Delay Time', 'Solve: Cheapest Flights Within K Stops', 'Learn: Bellman-Ford basics'], category: 'dsa', time: '4 hrs' },
            { day: 26, title: 'Recursion & Backtracking', tasks: ['Backtracking template', 'Solve: Word Search in Grid', 'Solve: Permutations', 'Solve: Combination Sum'], category: 'dsa', time: '3-4 hrs' },
            { day: 27, title: 'Advanced Backtracking', tasks: ['Solve: N-Queens', 'Solve: Sudoku Solver', 'Solve: Letter Combinations of Phone Number', 'Pattern: prune early, restore state'], category: 'dsa', time: '3-4 hrs' },
            { day: 28, title: '📝 Month 1 Grand Revision', tasks: ['Full revision of Weeks 1-4', 'Solve 1 problem from each category (arrays, LL, tree, graph)', 'Write a cheat sheet of all patterns', 'Celebrate 🎉 — Month 1 done!'], category: 'revision', time: '3-4 hrs' }
        ]
    },

    // ═══════════════ PHASE 2: ADVANCED DSA + LLD (Weeks 5-8) ═══════════════
    // ─── Week 5: Dynamic Programming I ────────────────────
    {
        week: 5, theme: 'Dynamic Programming Basics', phase: 'Advanced DSA + LLD', phaseColor: 'amber',
        days: [
            { day: 29, title: 'DP Introduction', tasks: ['Understand memoization vs tabulation', 'Solve: Climbing Stairs', 'Solve: Fibonacci Number', 'Solve: House Robber'], category: 'dsa', time: '3-4 hrs' },
            { day: 30, title: '1D DP', tasks: ['1D DP patterns', 'Solve: Coin Change', 'Solve: Longest Increasing Subsequence', 'Solve: Word Break'], category: 'dsa', time: '3-4 hrs' },
            { day: 31, title: '2D DP', tasks: ['Grid-based DP', 'Solve: Unique Paths', 'Solve: Minimum Path Sum', 'Solve: Edit Distance'], category: 'dsa', time: '4 hrs' },
            { day: 32, title: 'Knapsack Patterns', tasks: ['0/1 Knapsack pattern', 'Solve: Partition Equal Subset Sum', 'Solve: Target Sum', 'Solve: Coin Change 2 (unbounded knapsack)'], category: 'dsa', time: '3-4 hrs' },
            { day: 33, title: 'String DP', tasks: ['Longest Common Subsequence pattern', 'Solve: LCS', 'Solve: Longest Palindromic Subsequence', 'Solve: Distinct Subsequences'], category: 'dsa', time: '3-4 hrs' },
            { day: 34, title: 'Interval DP', tasks: ['Interval and decision DP', 'Solve: Burst Balloons', 'Solve: Maximum Profit in Job Scheduling', 'Practice: identify DP subproblems'], category: 'dsa', time: '4 hrs' },
            { day: 35, title: '📝 Week 5 Revision', tasks: ['Review all DP patterns (1D, 2D, knapsack, string)', 'Re-solve Edit Distance and LIS', 'Create DP pattern cheat sheet', 'Timed: solve 2 medium DP problems in 40 min'], category: 'revision', time: '2-3 hrs' }
        ]
    },
    // ─── Week 6: Advanced Patterns & Heaps ────────────────
    {
        week: 6, theme: 'Heaps, Tries & Advanced Patterns', phase: 'Advanced DSA + LLD', phaseColor: 'amber',
        days: [
            { day: 36, title: 'Heaps / Priority Queues', tasks: ['Min-heap, max-heap operations', 'Solve: Kth Largest Element', 'Solve: Find Median from Data Stream', 'Solve: Top K Frequent Words'], category: 'dsa', time: '3-4 hrs' },
            { day: 37, title: 'Tries', tasks: ['Trie implementation', 'Solve: Implement Trie', 'Solve: Word Search II', 'Solve: Design Add and Search Words'], category: 'dsa', time: '3-4 hrs' },
            { day: 38, title: 'Union-Find', tasks: ['Disjoint Set Union with path compression', 'Solve: Number of Provinces', 'Solve: Redundant Connection', 'Solve: Accounts Merge'], category: 'dsa', time: '3-4 hrs' },
            { day: 39, title: 'Greedy Algorithms', tasks: ['Greedy pattern recognition', 'Solve: Jump Game', 'Solve: Task Scheduler', 'Solve: Meeting Rooms II'], category: 'dsa', time: '3-4 hrs' },
            { day: 40, title: 'Bit Manipulation', tasks: ['Bit operations & tricks', 'Solve: Single Number', 'Solve: Counting Bits', 'Solve: Reverse Bits'], category: 'dsa', time: '2-3 hrs' },
            { day: 41, title: 'Math & Mixed Problems', tasks: ['Solve: Pow(x, n)', 'Solve: Rotate Image', 'Solve: Spiral Matrix', 'Practice: mix of all patterns'], category: 'dsa', time: '3-4 hrs' },
            { day: 42, title: '📝 Week 6 Revision', tasks: ['Revise heaps, tries, union-find, greedy', 'Re-solve Find Median from Data Stream', 'Compile "must-know" problem list', 'Timed mock: 3 problems in 1 hour'], category: 'revision', time: '2-3 hrs' }
        ]
    },
    // ─── Week 7: LLD - OOP & SOLID ────────────────────────
    {
        week: 7, theme: 'OOP & SOLID Principles', phase: 'Advanced DSA + LLD', phaseColor: 'amber',
        days: [
            { day: 43, title: 'OOP Fundamentals', tasks: ['Encapsulation, Abstraction, Inheritance, Polymorphism', 'Code examples of each principle', 'Read: "Head First OOP" key chapters', 'Practice: model a Library system with classes'], category: 'lld', time: '3-4 hrs' },
            { day: 44, title: 'SOLID - S & O', tasks: ['Single Responsibility Principle', 'Open/Closed Principle', 'Refactor a bad code example using SRP', 'Code example: extending without modifying'], category: 'lld', time: '3 hrs' },
            { day: 45, title: 'SOLID - L, I, D', tasks: ['Liskov Substitution Principle', 'Interface Segregation Principle', 'Dependency Inversion Principle', 'Identify SOLID violations in sample code'], category: 'lld', time: '3 hrs' },
            { day: 46, title: 'UML Basics', tasks: ['Class diagrams, sequence diagrams', 'Draw UML for a simple e-commerce system', 'Learn relationship types (association, composition, aggregation)', 'Practice with 2 small scenarios'], category: 'lld', time: '2-3 hrs' },
            { day: 47, title: 'LLD Practice: Parking Lot', tasks: ['Design parking lot system end-to-end', 'Identify classes, interfaces, relationships', 'Apply Strategy pattern for allocation', 'Code key classes'], category: 'lld', time: '4 hrs' },
            { day: 48, title: 'LLD Practice: Rate Limiter', tasks: ['Design rate limiter with multiple algorithms', 'Token Bucket vs Sliding Window', 'Code both implementations', 'Add thread-safety considerations'], category: 'lld', time: '4 hrs' },
            { day: 49, title: '📝 Week 7 Revision', tasks: ['Revise OOP, SOLID, UML', 'Re-design Parking Lot from scratch (timed)', 'Write SOLID principle cheat sheet', 'DSA practice: solve 2 problems to stay sharp'], category: 'revision', time: '2-3 hrs' }
        ]
    },
    // ─── Week 8: Design Patterns ──────────────────────────
    {
        week: 8, theme: 'Design Patterns & LLD Practice', phase: 'Advanced DSA + LLD', phaseColor: 'amber',
        days: [
            { day: 50, title: 'Creational Patterns', tasks: ['Singleton, Factory, Abstract Factory, Builder', 'Code each pattern with examples', 'Know when to use which', 'Real-world use cases'], category: 'lld', time: '3-4 hrs' },
            { day: 51, title: 'Structural Patterns', tasks: ['Adapter, Decorator, Facade, Proxy', 'Code Decorator pattern (coffee shop example)', 'Code Adapter pattern (payment gateway)', 'Compare with similar patterns'], category: 'lld', time: '3-4 hrs' },
            { day: 52, title: 'Behavioral Patterns', tasks: ['Observer, Strategy, Command, State', 'Code Observer (event system)', 'Code Strategy (sorting algorithms)', 'Code State (vending machine)'], category: 'lld', time: '3-4 hrs' },
            { day: 53, title: 'LLD: Elevator System', tasks: ['Full LLD: elevator system design', 'State pattern for elevator states', 'Strategy for scheduling algorithm', 'Draw class & sequence diagrams'], category: 'lld', time: '4 hrs' },
            { day: 54, title: 'LLD: Chess Game', tasks: ['Full LLD: chess game design', 'Piece hierarchy with polymorphism', 'Command pattern for undo', 'Handle special moves (castling, en passant)'], category: 'lld', time: '4 hrs' },
            { day: 55, title: 'LLD: BookMyShow', tasks: ['Full LLD: movie booking system', 'Handle concurrent seat booking', 'State pattern for booking lifecycle', 'Payment integration design'], category: 'lld', time: '4 hrs' },
            { day: 56, title: '📝 Month 2 Grand Revision', tasks: ['Full revision of Weeks 5-8', 'Re-solve 2 DP problems + 1 LLD design', 'Review all design patterns', 'Celebrate 🎉 — Month 2 done!'], category: 'revision', time: '3-4 hrs' }
        ]
    },

    // ═══════════════ PHASE 3: SYSTEM DESIGN (Weeks 9-11) ═══════════════
    // ─── Week 9: HLD Fundamentals ─────────────────────────
    {
        week: 9, theme: 'HLD Fundamentals', phase: 'System Design', phaseColor: 'emerald',
        days: [
            { day: 57, title: 'Scalability Basics', tasks: ['Horizontal vs vertical scaling', 'Load balancing (Round Robin, Consistent Hashing)', 'Read: "Designing Data-Intensive Applications" Ch 1', 'Practice: back-of-envelope estimation'], category: 'hld', time: '3-4 hrs' },
            { day: 58, title: 'Databases', tasks: ['SQL vs NoSQL tradeoffs', 'Database sharding and replication', 'CAP theorem deep dive', 'Practice: choose DB for different scenarios'], category: 'hld', time: '3-4 hrs' },
            { day: 59, title: 'Caching', tasks: ['Cache patterns (write-through, write-behind, aside)', 'Redis/Memcached overview', 'Cache eviction policies (LRU, LFU)', 'CDN basics and edge caching'], category: 'hld', time: '3-4 hrs' },
            { day: 60, title: 'Message Queues', tasks: ['Kafka, RabbitMQ concepts', 'Pub/Sub vs point-to-point', 'Event-driven architecture', 'Use cases: async processing, decoupling'], category: 'hld', time: '3-4 hrs' },
            { day: 61, title: 'API Design & Microservices', tasks: ['REST vs GraphQL vs gRPC', 'API rate limiting and pagination', 'Microservices patterns (API Gateway, Service Mesh)', 'Service discovery and communication'], category: 'hld', time: '3-4 hrs' },
            { day: 62, title: 'Consistency & Availability', tasks: ['Consistency models (strong, eventual, causal)', 'Consensus algorithms (Raft, Paxos overview)', 'Distributed transactions (2PC, Saga)', 'When to choose consistency vs availability'], category: 'hld', time: '3-4 hrs' },
            { day: 63, title: '📝 Week 9 Revision', tasks: ['Revise all HLD fundamentals', 'Create a system design template/framework', 'Practice estimation for 3 systems', 'DSA warmup: solve 2 medium problems'], category: 'revision', time: '2-3 hrs' }
        ]
    },
    // ─── Week 10: HLD Practice ────────────────────────────
    {
        week: 10, theme: 'HLD Practice Problems', phase: 'System Design', phaseColor: 'emerald',
        days: [
            { day: 64, title: 'Design: URL Shortener', tasks: ['Full system design: URL shortener', 'Key generation (Base62, pre-computed)', 'Database schema & caching strategy', 'Handle 100M URLs, 10B redirects/month'], category: 'hld', time: '4 hrs' },
            { day: 65, title: 'Design: Chat System', tasks: ['Full system design: real-time chat', 'WebSocket connections & fan-out', 'Message ordering & delivery guarantees', 'Handle 50M DAU, group chats'], category: 'hld', time: '4 hrs' },
            { day: 66, title: 'Design: News Feed', tasks: ['Full system design: social feed', 'Fan-out on write vs read', 'Feed ranking algorithm', 'Celebrity problem & hybrid approach'], category: 'hld', time: '4 hrs' },
            { day: 67, title: 'Design: Video Streaming', tasks: ['Full system design: YouTube/Netflix', 'Video transcoding pipeline', 'Adaptive bitrate streaming', 'CDN and content delivery'], category: 'hld', time: '4 hrs' },
            { day: 68, title: 'Design: E-Commerce', tasks: ['Full system design: Amazon', 'Inventory management with flash sales', 'Order processing pipeline', 'Search with Elasticsearch'], category: 'hld', time: '4 hrs' },
            { day: 69, title: 'Design: Ride-Sharing', tasks: ['Full system design: Uber/Lyft', 'Geospatial indexing (QuadTree, GeoHash)', 'Real-time matching & surge pricing', 'Trip lifecycle management'], category: 'hld', time: '4 hrs' },
            { day: 70, title: '📝 Week 10 Revision', tasks: ['Revise all 6 HLD designs', 'Practice presenting one design in 35 min', 'Create a reference card for each system', 'Identify common building blocks across designs'], category: 'revision', time: '3 hrs' }
        ]
    },
    // ─── Week 11: LLD Deep Dive + Mixed ───────────────────
    {
        week: 11, theme: 'LLD Practice + HLD Advanced', phase: 'System Design', phaseColor: 'emerald',
        days: [
            { day: 71, title: 'LLD: File System', tasks: ['Design in-memory file system', 'Composite pattern for files/directories', 'Path navigation and search', 'Permissions model'], category: 'lld', time: '4 hrs' },
            { day: 72, title: 'LLD: Task Scheduler', tasks: ['Design a task scheduler', 'One-time and recurring tasks', 'Task dependencies (DAG)', 'Execution policies and concurrency'], category: 'lld', time: '4 hrs' },
            { day: 73, title: 'LLD: Notification Service', tasks: ['Design notification service', 'Multi-channel (email, SMS, push)', 'Template engine and priority queues', 'Retry with backoff'], category: 'lld', time: '4 hrs' },
            { day: 74, title: 'HLD: Distributed Cache', tasks: ['Design Redis-like cache', 'Consistent hashing', 'Replication and failover', 'Eviction policies at scale'], category: 'hld', time: '4 hrs' },
            { day: 75, title: 'HLD: Search Engine', tasks: ['Design Google-like search', 'Web crawling and indexing', 'Inverted index and ranking', 'Query processing pipeline'], category: 'hld', time: '4 hrs' },
            { day: 76, title: 'Mixed Practice Day', tasks: ['1 DSA problem (hard)', '1 LLD design (30 min)', '1 HLD design (35 min)', 'Simulate interview conditions'], category: 'mixed', time: '4-5 hrs' },
            { day: 77, title: '📝 Week 11 Revision', tasks: ['Full Phase 3 revision', 'Quick-draw all system designs from memory', 'Identify your weakest area and drill it', 'DSA warmup: 2 problems'], category: 'revision', time: '3 hrs' }
        ]
    },

    // ═══════════════ PHASE 4: INTERVIEW READY (Weeks 12-13) ═══════════════
    // ─── Week 12: Behavioral + Mock Interviews ────────────
    {
        week: 12, theme: 'Behavioral & Mock Interviews', phase: 'Interview Ready', phaseColor: 'rose',
        days: [
            { day: 78, title: 'STAR Method & Stories', tasks: ['Learn STAR framework', 'Prepare 5 key stories from your experience', 'Practice: conflict resolution story', 'Practice: leadership story'], category: 'hr', time: '3 hrs' },
            { day: 79, title: 'Common Behavioral Questions', tasks: ['Practice: "Tell me about yourself"', 'Practice: "Why this company?"', 'Practice: "Biggest failure" story', 'Practice: "Handling disagreement" story'], category: 'hr', time: '3 hrs' },
            { day: 80, title: 'Advanced Behavioral', tasks: ['Practice: mentoring/coaching story', 'Practice: tight deadline story', 'Practice: cross-functional collaboration', 'Practice: customer obsession story'], category: 'hr', time: '3 hrs' },
            { day: 81, title: 'Mock: DSA Interview', tasks: ['Full mock DSA round (45 min)', 'Solve 2 problems under time pressure', 'Practice thinking aloud', 'Self-evaluate communication & approach'], category: 'mock', time: '3-4 hrs' },
            { day: 82, title: 'Mock: LLD Interview', tasks: ['Full mock LLD round (45 min)', 'Design a system from scratch', 'Practice drawing diagrams while explaining', 'Focus on trade-offs and extensibility'], category: 'mock', time: '3-4 hrs' },
            { day: 83, title: 'Mock: HLD Interview', tasks: ['Full mock HLD round (45 min)', 'Start with requirements → estimation → design', 'Practice deep-dives on specific components', 'Time yourself on the full flow'], category: 'mock', time: '3-4 hrs' },
            { day: 84, title: '📝 Week 12 Revision', tasks: ['Revise all behavioral stories', 'Review mock interview performance', 'List top 5 areas to improve', 'Polish your "Tell me about yourself" intro'], category: 'revision', time: '2-3 hrs' }
        ]
    },
    // ─── Week 13: Final Push ──────────────────────────────
    {
        week: 13, theme: 'Final Sprint & Full Mocks', phase: 'Interview Ready', phaseColor: 'rose',
        days: [
            { day: 85, title: 'Weak Area Deep Dive', tasks: ['Identify your 3 weakest topics', 'Dedicated practice on weak areas', 'Solve 3-4 problems in weak category', 'Review solutions and patterns'], category: 'mixed', time: '4 hrs' },
            { day: 86, title: 'Full Mock: Round 1 (DSA)', tasks: ['Simulated DSA interview (45 min)', '2 problems: 1 medium + 1 hard', 'Record yourself and review', 'Note communication improvements'], category: 'mock', time: '3-4 hrs' },
            { day: 87, title: 'Full Mock: Round 2 (Design)', tasks: ['Simulated LLD or HLD (45 min)', 'Practice under real conditions', 'Time your requirement gathering phase', 'Focus on structured presentation'], category: 'mock', time: '3-4 hrs' },
            { day: 88, title: 'Full Mock: Round 3 (Complete)', tasks: ['Full loop simulation: DSA + Design + HR', 'Back-to-back rounds with breaks', 'Practice energy management', 'Get feedback from a friend if possible'], category: 'mock', time: '5-6 hrs' },
            { day: 89, title: 'Final Review & Cheat Sheets', tasks: ['Review all cheat sheets and notes', 'Quick-run through key patterns', 'Prepare your interview-day kit', 'Relax and do light revision only'], category: 'revision', time: '2-3 hrs' },
            { day: 90, title: '🎓 Graduation Day!', tasks: ['Final light review of your strongest topics', 'Re-read your STAR stories once', 'Visualize success and stay confident', '🏆 You are Interview Ready! Celebrate!'], category: 'celebration', time: '1-2 hrs' }
        ]
    }
];
