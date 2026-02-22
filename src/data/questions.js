// ═══════════════════════════════════════════════════════════
// Question Bank — Built-in questions for all 4 round types
// ═══════════════════════════════════════════════════════════

export const questions = {

    // ─── DSA Questions ───────────────────────────────────────
    dsa: [
        {
            id: 'dsa-1',
            title: 'Subarray with Target Sum',
            difficulty: 'medium',
            tags: ['arrays', 'sliding-window', 'hash-map'],
            statement: `Given an array of positive integers \`nums\` and a positive integer \`target\`, find the minimal length of a contiguous subarray whose sum is greater than or equal to \`target\`. If there is no such subarray, return 0.`,
            constraints: [
                '1 <= nums.length <= 10^5',
                '1 <= nums[i] <= 10^4',
                '1 <= target <= 10^9'
            ],
            examples: [
                { input: 'nums = [2,3,1,2,4,3], target = 7', output: '2', explanation: 'The subarray [4,3] has the minimal length under the constraint.' },
                { input: 'nums = [1,4,4], target = 4', output: '1', explanation: 'Subarray [4] meets the target.' },
                { input: 'nums = [1,1,1,1,1,1], target = 100', output: '0', explanation: 'No subarray sums to 100.' }
            ],
            expectedOutline: 'Sliding window: maintain a window with running sum, shrink from left when sum >= target, track min length.',
            pitfalls: ['Off-by-one in window boundaries', 'Forgetting the case where no subarray exists', 'Not handling single-element arrays'],
            rubricHints: { optimal: 'O(n) with sliding window', suboptimal: 'O(n^2) with nested loops or O(n log n) with binary search + prefix sums' },
            hiddenTests: [
                { input: [1], target: 1, expected: 1 },
                { input: [1, 2, 3, 4, 5], target: 15, expected: 5 },
                { input: [5, 1, 3, 5, 10, 7, 4, 9, 2, 8], target: 15, expected: 2 },
                { input: Array.from({ length: 1000 }, () => 1), target: 500, expected: 500 }
            ]
        },
        {
            id: 'dsa-2',
            title: 'Balanced Binary Tree Check',
            difficulty: 'easy',
            tags: ['trees', 'recursion', 'dfs'],
            statement: `Given the root of a binary tree, determine if it is height-balanced. A height-balanced binary tree is one in which the depth of the two subtrees of every node never differs by more than one.`,
            constraints: [
                'The number of nodes in the tree is in the range [0, 5000]',
                '-10^4 <= Node.val <= 10^4'
            ],
            examples: [
                { input: 'root = [3,9,20,null,null,15,7]', output: 'true' },
                { input: 'root = [1,2,2,3,3,null,null,4,4]', output: 'false' },
                { input: 'root = []', output: 'true' }
            ],
            expectedOutline: 'DFS returning height or -1 (unbalanced signal). Check |left - right| <= 1 at each node.',
            pitfalls: ['Computing height separately (O(n^2))', 'Not handling null/empty tree', 'Returning wrong sentinel values'],
            rubricHints: { optimal: 'O(n) single-pass DFS', suboptimal: 'O(n^2) computing height at each node' },
            hiddenTests: []
        },
        {
            id: 'dsa-3',
            title: 'Course Schedule',
            difficulty: 'medium',
            tags: ['graphs', 'topological-sort', 'bfs', 'dfs'],
            statement: `You have \`numCourses\` courses labeled from 0 to numCourses-1. You are given an array \`prerequisites\` where prerequisites[i] = [a, b] indicates you must take course b before course a. Return true if you can finish all courses, false otherwise.`,
            constraints: [
                '1 <= numCourses <= 2000',
                '0 <= prerequisites.length <= 5000',
                'prerequisites[i].length == 2',
                '0 <= a, b < numCourses',
                'All prerequisite pairs are unique'
            ],
            examples: [
                { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
                { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Circular dependency.' }
            ],
            expectedOutline: 'Topological sort via BFS (Kahn\'s) or DFS cycle detection. Build adjacency list, track in-degrees.',
            pitfalls: ['Not detecting all cycles', 'Off-by-one in course numbering', 'Ignoring disconnected components'],
            rubricHints: { optimal: 'O(V+E) topological sort', suboptimal: 'O(V*E) brute-force DFS from each node' },
            hiddenTests: []
        },
        {
            id: 'dsa-4',
            title: 'Longest Increasing Subsequence',
            difficulty: 'medium',
            tags: ['dynamic-programming', 'binary-search'],
            statement: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.`,
            constraints: [
                '1 <= nums.length <= 2500',
                '-10^4 <= nums[i] <= 10^4'
            ],
            examples: [
                { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The LIS is [2,3,7,101].' },
                { input: 'nums = [0,1,0,3,2,3]', output: '4' },
                { input: 'nums = [7,7,7,7,7]', output: '1' }
            ],
            expectedOutline: 'DP with patience sorting: maintain tails array, use binary search to place each element.',
            pitfalls: ['Confusing subsequence with subarray', 'Not handling duplicates', 'Off-by-one in binary search'],
            rubricHints: { optimal: 'O(n log n) with binary search + tails', suboptimal: 'O(n^2) DP' },
            hiddenTests: []
        },
        {
            id: 'dsa-5',
            title: 'Design a LRU Cache',
            difficulty: 'hard',
            tags: ['design', 'hash-map', 'linked-list'],
            statement: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the \`LRUCache\` class with \`get(key)\` and \`put(key, value)\` operations, both running in O(1) time.`,
            constraints: [
                '1 <= capacity <= 3000',
                '0 <= key <= 10^4',
                '0 <= value <= 10^5',
                'At most 2 * 10^5 calls to get and put'
            ],
            examples: [
                { input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', output: '[null,null,null,1,null,-1,null,-1,3,4]' }
            ],
            expectedOutline: 'Hash map + doubly linked list. Map for O(1) lookup, DLL for O(1) insertion/removal of LRU order.',
            pitfalls: ['Not updating order on get', 'Edge case: capacity 1', 'Memory leaks with node references'],
            rubricHints: { optimal: 'O(1) for both operations with HashMap + DLL', suboptimal: 'O(n) eviction with array' },
            hiddenTests: []
        },
        {
            id: 'dsa-6',
            title: 'Maximum Profit in Job Scheduling',
            difficulty: 'hard',
            tags: ['dynamic-programming', 'binary-search', 'sorting'],
            statement: `You have n jobs where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i]. Find the maximum profit you can get such that no two jobs overlap. You may start a job at the same time another one ends.`,
            constraints: [
                '1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4',
                '1 <= startTime[i] < endTime[i] <= 10^9',
                '1 <= profit[i] <= 10^4'
            ],
            examples: [
                { input: 'startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]', output: '120' },
                { input: 'startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]', output: '150' }
            ],
            expectedOutline: 'Sort by end time, DP with binary search for the latest non-overlapping job.',
            pitfalls: ['Not sorting correctly', 'Binary search off-by-one', 'Handling equal start/end times'],
            rubricHints: { optimal: 'O(n log n) sort + DP + binary search', suboptimal: 'O(n^2) DP without binary search' },
            hiddenTests: []
        }
    ],

    // ─── LLD Questions ──────────────────────────────────────
    lld: [
        {
            id: 'lld-1',
            title: 'Design a Parking Lot System',
            difficulty: 'medium',
            tags: ['oop', 'design-patterns', 'strategy'],
            statement: `Design a parking lot system that can handle multiple levels, different vehicle types (motorcycle, car, bus), and track available spots. The system should support parking a vehicle, removing a vehicle, and querying available spots.`,
            requirements: [
                'Multiple parking levels',
                'Different spot sizes: small, medium, large',
                'Vehicle types: motorcycle (small), car (medium), bus (large, consecutive spots)',
                'Park and unpark operations',
                'Query available spots by type/level',
                'Handle concurrent access'
            ],
            expectedEntities: ['ParkingLot', 'Level', 'ParkingSpot', 'Vehicle', 'Ticket', 'ParkingStrategy'],
            patterns: ['Strategy (parking allocation)', 'Factory (vehicle creation)', 'Observer (spot availability notifications)'],
            followUps: ['How would you add payment?', 'How would you handle EV charging spots?', 'How would you handle peak hour pricing?']
        },
        {
            id: 'lld-2',
            title: 'Design a Rate Limiter',
            difficulty: 'medium',
            tags: ['concurrency', 'design-patterns', 'algorithms'],
            statement: `Design a rate limiter that can be used to limit the number of requests a client can make within a time window. Support multiple algorithms (fixed window, sliding window, token bucket).`,
            requirements: [
                'Support different rate limiting algorithms',
                'Per-client rate limiting',
                'Configurable limits and time windows',
                'Thread-safe operations',
                'Support for distributed deployments'
            ],
            expectedEntities: ['RateLimiter', 'RateLimitAlgorithm', 'TokenBucket', 'SlidingWindowCounter', 'FixedWindowCounter', 'RateLimitConfig'],
            patterns: ['Strategy (algorithm selection)', 'Decorator (composing limiters)', 'Singleton (shared state)'],
            followUps: ['How would you handle distributed rate limiting?', 'What happens during clock drift?', 'How do you handle burst traffic?']
        },
        {
            id: 'lld-3',
            title: 'Design a Notification Service',
            difficulty: 'medium',
            tags: ['oop', 'observer', 'template-method'],
            statement: `Design a notification service that supports multiple channels (email, SMS, push notification, in-app) with priority levels, retry logic, and user preference management.`,
            requirements: [
                'Multiple notification channels',
                'User channel preferences',
                'Priority levels (critical, high, medium, low)',
                'Retry with backoff on failure',
                'Template-based message formatting',
                'Rate limiting per user per channel'
            ],
            expectedEntities: ['NotificationService', 'Notification', 'Channel', 'UserPreference', 'Template', 'RetryPolicy', 'NotificationQueue'],
            patterns: ['Observer', 'Template Method', 'Strategy', 'Builder (notification construction)'],
            followUps: ['How do you handle notification aggregation?', 'How do you prevent notification fatigue?']
        },
        {
            id: 'lld-4',
            title: 'Design a File System',
            difficulty: 'hard',
            tags: ['composite', 'oop', 'trees'],
            statement: `Design an in-memory file system that supports creating files/directories, reading/writing file content, listing directory contents, searching by name/extension, and computing directory sizes.`,
            requirements: [
                'Create, delete, move files and directories',
                'Read and write file contents',
                'Path-based navigation',
                'Search functionality',
                'Size computation (recursive for directories)',
                'Permissions (read, write, execute)'
            ],
            expectedEntities: ['FileSystem', 'FileSystemNode', 'File', 'Directory', 'Permission', 'Path'],
            patterns: ['Composite (file/directory hierarchy)', 'Iterator (directory traversal)', 'Visitor (search, size computation)'],
            followUps: ['How would you add version history?', 'How would you handle symbolic links?']
        },
        {
            id: 'lld-5',
            title: 'Design a Task Scheduler',
            difficulty: 'hard',
            tags: ['concurrency', 'design-patterns', 'scheduling'],
            statement: `Design a task scheduler that supports one-time and recurring tasks, with priorities, dependencies between tasks, and configurable execution policies (sequential, parallel, with max concurrency).`,
            requirements: [
                'Schedule one-time and recurring tasks',
                'Task priorities',
                'Task dependencies (DAG)',
                'Configurable concurrency limits',
                'Task cancellation and status tracking',
                'Error handling and retry policies'
            ],
            expectedEntities: ['Scheduler', 'Task', 'TaskDAG', 'ExecutionPolicy', 'TaskStatus', 'RetryPolicy', 'TaskResult'],
            patterns: ['Command (task encapsulation)', 'Observer (status changes)', 'Strategy (execution policies)', 'Chain of Responsibility (error handling)'],
            followUps: ['How do you handle task timeouts?', 'How do you persist scheduled tasks across restarts?']
        }
    ],

    // ─── HLD Questions ──────────────────────────────────────
    hld: [
        {
            id: 'hld-1',
            title: 'Design a URL Shortener',
            difficulty: 'medium',
            tags: ['system-design', 'hashing', 'caching', 'databases'],
            statement: `Design a URL shortening service like bit.ly. The system should generate short unique URLs, redirect to original URLs, handle high read traffic, and provide analytics on click counts.`,
            requirements: {
                functional: ['Shorten a URL', 'Redirect short URL → original', 'Custom alias support', 'Link expiration', 'Click analytics'],
                nonFunctional: ['Low latency redirects (<100ms)', 'High availability (99.99%)', 'Handle 100M URLs, 10B redirects/month', 'URLs should be hard to guess']
            },
            estimations: { writes: '~40 URLs/sec', reads: '~4000 redirects/sec', storage: '~500GB over 5 years' },
            keyComponents: ['API Gateway', 'URL Service', 'Key Generation Service', 'Cache (Redis)', 'Database (sharded)', 'Analytics Pipeline'],
            tradeoffs: ['Base62 vs random IDs', 'Pre-generated vs on-demand keys', 'SQL vs NoSQL', 'Consistency vs availability']
        },
        {
            id: 'hld-2',
            title: 'Design a Real-Time Chat System',
            difficulty: 'hard',
            tags: ['system-design', 'websockets', 'messaging', 'databases'],
            statement: `Design a real-time messaging system like WhatsApp/Slack supporting 1:1 chats, group chats (up to 500 members), message delivery/read receipts, online status, media sharing, and message search.`,
            requirements: {
                functional: ['1:1 and group messaging', 'Media sharing', 'Delivery & read receipts', 'Online presence', 'Message search', 'Push notifications'],
                nonFunctional: ['Real-time delivery (<500ms)', 'Message ordering', 'At-least-once delivery', '50M DAU', 'Support offline/reconnect']
            },
            estimations: { messages: '~40B messages/day', connections: '~25M concurrent WebSocket connections', storage: '~100TB/year' },
            keyComponents: ['WebSocket Gateway', 'Chat Service', 'Message Queue (Kafka)', 'Message Store (Cassandra)', 'User Presence Service', 'Push Notification Service', 'Media Service (S3/CDN)', 'Search (Elasticsearch)'],
            tradeoffs: ['WebSocket vs SSE vs long polling', 'Fan-out on write vs fan-out on read', 'Eventual vs strong consistency for messages']
        },
        {
            id: 'hld-3',
            title: 'Design a News Feed System',
            difficulty: 'hard',
            tags: ['system-design', 'caching', 'fanout', 'ranking'],
            statement: `Design a social media news feed (like Twitter/Instagram). Users should see a personalized, ranked feed of posts from people they follow, with support for likes, comments, and real-time updates.`,
            requirements: {
                functional: ['Create posts', 'Follow/unfollow users', 'Personalized feed', 'Likes and comments', 'Real-time feed updates', 'Media attachments'],
                nonFunctional: ['Feed generation < 500ms', '500M users, 100M DAU', 'High availability', 'Eventual consistency OK for feed']
            },
            estimations: { posts: '~2M posts/day', feedReads: '~10B feed reads/day' },
            keyComponents: ['Post Service', 'Feed Service', 'Fan-out Service', 'Timeline Cache (Redis)', 'Social Graph Service', 'Ranking Service', 'CDN'],
            tradeoffs: ['Fan-out on write (precompute) vs fan-out on read (compute on demand)', 'Hybrid approach for celebrities', 'Chronological vs ML-ranked feed']
        },
        {
            id: 'hld-4',
            title: 'Design a Distributed File Storage',
            difficulty: 'hard',
            tags: ['system-design', 'distributed-systems', 'replication'],
            statement: `Design a cloud file storage service like Google Drive / Dropbox. Support file upload/download, sharing, versioning, sync across devices, and conflict resolution.`,
            requirements: {
                functional: ['File upload/download', 'Folder organization', 'Sharing with permissions', 'File versioning', 'Multi-device sync', 'Conflict resolution'],
                nonFunctional: ['Strong consistency for metadata', 'High availability for reads', 'Support files up to 50GB', '100M users, 10M concurrent']
            },
            estimations: { storage: '~500PB total', uploads: '~100K files/sec peak' },
            keyComponents: ['API Gateway', 'Metadata Service', 'Block Storage Service', 'Sync Service', 'Notification Service', 'Object Store (S3)', 'CDN', 'Queue (SQS/Kafka)'],
            tradeoffs: ['Chunked upload vs whole file', 'Diff-based sync vs full file sync', 'OT vs CRDT for conflict resolution']
        },
        {
            id: 'hld-5',
            title: 'Design a Payment Gateway',
            difficulty: 'hard',
            tags: ['system-design', 'transactions', 'reliability'],
            statement: `Design a payment processing system like Stripe/PayPal. Handle payment creation, processing via multiple providers, refunds, dispute handling, and reconciliation.`,
            requirements: {
                functional: ['Process payments (card, bank, wallet)', 'Refunds and partial refunds', 'Transaction history', 'Multi-currency support', 'Webhook notifications', 'Dispute handling'],
                nonFunctional: ['Exactly-once processing', 'PCI DSS compliance', '99.999% availability', '<2s payment processing', 'Strong consistency for transactions']
            },
            estimations: { transactions: '~10K TPS peak', amount: '~$1B daily volume' },
            keyComponents: ['API Gateway', 'Payment Orchestrator', 'Provider Adapters', 'Transaction Store', 'Idempotency Service', 'Ledger Service', 'Notification Service', 'Reconciliation Engine'],
            tradeoffs: ['Two-phase commit vs saga pattern', 'Synchronous vs async processing', 'Single vs double-entry bookkeeping']
        }
    ],

    // ─── HR/Behavioral Questions ────────────────────────────
    hr: [
        {
            id: 'hr-1',
            title: 'Tell me about a time you handled conflict',
            difficulty: 'medium',
            tags: ['conflict-resolution', 'collaboration'],
            statement: 'Tell me about a time you had a significant disagreement or conflict with a teammate or manager. How did you handle it, and what was the outcome?',
            followUps: [
                'What specifically did you disagree on?',
                'At what point did you escalate (or not)?',
                'What would you do differently if faced with the same situation?',
                'How did this affect your working relationship going forward?'
            ],
            evaluationCriteria: ['Shows empathy and active listening', 'Takes ownership without blaming', 'Demonstrates concrete resolution steps', 'Reflects on learning']
        },
        {
            id: 'hr-2',
            title: 'Describe a project you led with ambiguity',
            difficulty: 'medium',
            tags: ['leadership', 'ambiguity', 'ownership'],
            statement: 'Describe a time when you had to lead a project with significant ambiguity or unclear requirements. How did you drive clarity and deliver results?',
            followUps: [
                'How did you prioritize what to work on first?',
                'How did you get stakeholder alignment?',
                'What was the biggest risk and how did you mitigate it?',
                'What metrics did you use to measure success?'
            ],
            evaluationCriteria: ['Shows structured approach to ambiguity', 'Demonstrates stakeholder management', 'Takes initiative', 'Measures outcomes']
        },
        {
            id: 'hr-3',
            title: 'Tell me about a significant failure',
            difficulty: 'medium',
            tags: ['failure', 'reflection', 'growth'],
            statement: 'Tell me about a time you failed significantly at work. What happened, what did you learn, and how did you apply those lessons afterwards?',
            followUps: [
                'When did you realize something was going wrong?',
                'What could you have done earlier to prevent it?',
                'How did you communicate the failure to stakeholders?',
                'Can you give a specific example of applying the lesson learned?'
            ],
            evaluationCriteria: ['Genuine accountability', 'Depth of reflection', 'Concrete changes implemented', 'Shows growth mindset']
        },
        {
            id: 'hr-4',
            title: 'Describe an innovation you drove',
            difficulty: 'medium',
            tags: ['innovation', 'impact', 'initiative'],
            statement: 'Tell me about a time you identified an opportunity for improvement and drove a change that had significant impact. How did you get buy-in and implement it?',
            followUps: [
                'How did you measure the impact?',
                'Who were the skeptics and how did you convince them?',
                'What obstacles did you face during implementation?',
                'Would you approach it differently now?'
            ],
            evaluationCriteria: ['Proactive identification of opportunity', 'Quantifiable impact', 'Effective stakeholder influence', 'Execution quality']
        },
        {
            id: 'hr-5',
            title: 'Working with a difficult team member',
            difficulty: 'medium',
            tags: ['collaboration', 'communication', 'interpersonal'],
            statement: 'Tell me about a time you had to work closely with someone whose working style was very different from yours. How did you adapt and ensure productive collaboration?',
            followUps: [
                'What specifically was different about their style?',
                'Did you address the differences directly?',
                'What compromises did you make?',
                'What did you learn about yourself from this experience?'
            ],
            evaluationCriteria: ['Demonstrates adaptability', 'Shows emotional intelligence', 'Focuses on shared goals', 'Self-awareness']
        }
    ]
};

export function getQuestionsByRound(round) {
    return questions[round] || [];
}

export function getQuestionById(id) {
    for (const round of Object.values(questions)) {
        const q = round.find(q => q.id === id);
        if (q) return q;
    }
    return null;
}

export function getRandomQuestion(round, difficulty = null) {
    let pool = questions[round] || [];
    if (difficulty) {
        pool = pool.filter(q => q.difficulty === difficulty);
    }
    return pool[Math.floor(Math.random() * pool.length)] || null;
}
