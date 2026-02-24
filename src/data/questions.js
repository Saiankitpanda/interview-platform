// ═══════════════════════════════════════════════════════════
// Question Bank — NeetCode 150 for DSA + LLD, HLD, HR questions
// ═══════════════════════════════════════════════════════════

import { neetcode150 } from './neetcode150.js';

export const questions = {

    // ─── DSA Questions (NeetCode 150) ─────────────────────
    dsa: neetcode150,

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
            followUps: ['How would you add payment?', 'How would you handle EV charging spots?', 'How would you handle peak hour pricing?'],
            solution: {
                approach: 'Use **Strategy pattern** for parking allocation, **Factory** for vehicle creation, and **Observer** for notifications. ParkingLot contains Levels, each has ParkingSpots. Spots have types (small/medium/large). Vehicles get matched to compatible spots.',
                code: `// Key classes:\nclass ParkingLot { levels: Level[]; park(vehicle): Ticket; unpark(ticket): void; }\nclass Level { spots: ParkingSpot[]; findAvailable(type): ParkingSpot; }\nclass ParkingSpot { type: SpotType; vehicle: Vehicle | null; isAvailable(): boolean; }\nclass Vehicle { type: VehicleType; licensePlate: string; }\nclass Ticket { spot: ParkingSpot; vehicle: Vehicle; entryTime: Date; }\ninterface ParkingStrategy { findSpot(levels, vehicle): ParkingSpot; }`,
                timeComplexity: 'park(): O(L * S) where L=levels, S=spots per level',
                spaceComplexity: 'O(L * S) for spot tracking'
            }
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
            followUps: ['How would you handle distributed rate limiting?', 'What happens during clock drift?', 'How do you handle burst traffic?'],
            solution: {
                approach: 'Use **Strategy pattern** to swap algorithms. TokenBucket allows bursts, SlidingWindow is more accurate. Use ConcurrentHashMap for thread safety. Decorator pattern to compose rate limiters (per-user + global).',
                code: `interface RateLimiter { boolean allowRequest(String clientId); }\nclass TokenBucket implements RateLimiter {\n  int capacity; int tokens; long lastRefill;\n  boolean allowRequest(String clientId) {\n    refill();\n    if (tokens > 0) { tokens--; return true; }\n    return false;\n  }\n}\nclass SlidingWindowCounter implements RateLimiter { /* ... */ }\nclass RateLimiterFactory { RateLimiter create(Config config); }`,
                timeComplexity: 'O(1) for each request check',
                spaceComplexity: 'O(N) where N = number of clients'
            }
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
        },
        {
            id: 'lld-6',
            title: 'Design an Elevator System',
            difficulty: 'medium',
            tags: ['oop', 'state-machine', 'design-patterns'],
            statement: `Design an elevator system for a building with multiple floors. Support multiple elevators, efficient scheduling, and handling concurrent requests from different floors.`,
            requirements: [
                'Multiple elevators in a building',
                'Request from any floor (up/down)',
                'Internal panel (select destination floor)',
                'Efficient scheduling algorithm',
                'Weight capacity limits',
                'Emergency stop and alarms'
            ],
            expectedEntities: ['ElevatorSystem', 'Elevator', 'Floor', 'Request', 'Scheduler', 'Direction', 'ElevatorState'],
            patterns: ['State (elevator states)', 'Strategy (scheduling algorithms)', 'Observer (floor displays)'],
            followUps: ['How would you minimize wait times?', 'How would you handle peak hours?', 'What about VIP/express elevators?'],
            solution: {
                approach: 'Use **State pattern** for elevator states (Moving, Idle, Stopped). **Strategy pattern** for scheduling (SCAN, LOOK, SSTF). Each elevator maintains a priority queue of requests sorted by direction.',
                code: `// Key classes:\nclass ElevatorSystem { elevators: Elevator[]; scheduler: Scheduler; request(floor, dir): void; }\nclass Elevator { id; currentFloor; state: ElevatorState; direction: Direction; requests: PriorityQueue; }\nenum ElevatorState { IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN }\ninterface Scheduler { assignElevator(request, elevators): Elevator; }`,
                timeComplexity: 'O(E) per request where E = elevators',
                spaceComplexity: 'O(F * E) for floor tracking'
            }
        },
        {
            id: 'lld-7',
            title: 'Design BookMyShow',
            difficulty: 'hard',
            tags: ['oop', 'concurrency', 'design-patterns'],
            statement: `Design a movie ticket booking system like BookMyShow. Support browsing movies, selecting seats, booking tickets with payment, and handling concurrent bookings for the same seats.`,
            requirements: [
                'Browse movies by city, genre, language',
                'View showtimes and seat availability',
                'Select and book seats',
                'Handle concurrent seat bookings (prevent double-booking)',
                'Payment processing integration',
                'Booking cancellation and refunds'
            ],
            expectedEntities: ['Movie', 'Cinema', 'Screen', 'Show', 'Seat', 'Booking', 'Payment', 'User'],
            patterns: ['Strategy (pricing)', 'Observer (seat availability)', 'State (booking lifecycle)', 'Singleton (booking lock manager)'],
            followUps: ['How do you handle seat locking during checkout?', 'How would you implement dynamic pricing?']
        },
        {
            id: 'lld-8',
            title: 'Design a Chess Game',
            difficulty: 'hard',
            tags: ['oop', 'strategy', 'state-machine'],
            statement: `Design a chess game with all standard pieces, valid move checking, check/checkmate detection, move history, and undo functionality.`,
            requirements: [
                'All piece types with correct movement rules',
                'Check, checkmate, stalemate detection',
                'Castling, en passant, pawn promotion',
                'Move validation',
                'Move history and undo',
                'Turn management'
            ],
            expectedEntities: ['Game', 'Board', 'Piece', 'King', 'Queen', 'Rook', 'Bishop', 'Knight', 'Pawn', 'Move', 'Player', 'GameStatus'],
            patterns: ['Strategy (piece movement)', 'Command (moves for undo)', 'Observer (game state notifications)', 'Factory (piece creation)'],
            followUps: ['How would you add AI opponent?', 'How would you handle time controls?', 'How would you add multiplayer online support?']
        },
        {
            id: 'lld-9',
            title: 'Design Snake Game',
            difficulty: 'medium',
            tags: ['oop', 'queue', 'design'],
            statement: `Design the classic Snake game. The snake moves on a grid, eats food to grow, and the game ends when the snake collides with itself or the boundary.`,
            requirements: [
                'Snake movement in 4 directions',
                'Food spawning at random positions',
                'Snake growth on eating food',
                'Collision detection (boundary + self)',
                'Score tracking',
                'Speed increase over time'
            ],
            expectedEntities: ['Game', 'Snake', 'Board', 'Cell', 'Food', 'Direction', 'GameState'],
            patterns: ['State (game states)', 'Observer (score updates)', 'Strategy (food placement)'],
            followUps: ['How would you add multiplayer?', 'How would you add power-ups?', 'How would you handle different difficulty levels?'],
            solution: {
                approach: 'Snake is a **deque** (doubly-ended queue). Head moves forward, tail pops unless food eaten. Board tracks occupied cells for O(1) collision check.',
                code: `class Snake {\n  body: Deque<Position>;\n  direction: Direction;\n  move(): boolean { /* add head in direction, check collision, remove tail if no food */ }\n}\nclass Game {\n  board: Board; snake: Snake; food: Position; score: number;\n  update(): GameState { /* move snake, check food, spawn new food */ }\n}`,
                timeComplexity: 'O(1) per move with HashSet for body positions',
                spaceComplexity: 'O(N) where N = snake length'
            }
        },
        {
            id: 'lld-10',
            title: 'Design a Social Media Feed',
            difficulty: 'hard',
            tags: ['oop', 'design-patterns', 'data-structures'],
            statement: `Design a social media platform supporting posts, comments, likes, follows, and a personalized feed. Support different content types (text, image, video) and feed ranking.`,
            requirements: [
                'Create posts (text, image, video)',
                'Like, comment, share posts',
                'Follow/unfollow users',
                'Personalized feed generation',
                'Feed ranking (chronological + engagement)',
                'Notifications for interactions'
            ],
            expectedEntities: ['User', 'Post', 'Comment', 'Like', 'Feed', 'FeedGenerator', 'FeedRanker', 'Notification'],
            patterns: ['Observer (notifications)', 'Strategy (feed ranking)', 'Factory (post types)', 'Decorator (content filters)'],
            followUps: ['How would you implement content moderation?', 'How would you handle trending posts?', 'How would you implement story/reel features?']
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
        },
        {
            id: 'hld-6',
            title: 'Design a Search Engine',
            difficulty: 'hard',
            tags: ['system-design', 'indexing', 'distributed-systems'],
            statement: `Design a web search engine like Google. Support web crawling, indexing, ranking, and serving search results with low latency to billions of users.`,
            requirements: {
                functional: ['Web crawling', 'Document indexing', 'Search query processing', 'Autocomplete', 'Spell correction', 'Personalized results'],
                nonFunctional: ['Sub-second query response', 'Billions of indexed pages', 'Fresh content (hours to days)', 'High availability worldwide']
            },
            estimations: { pages: '~100B web pages indexed', queries: '~100K QPS', indexSize: '~100PB' },
            keyComponents: ['Web Crawler (distributed)', 'Document Processor', 'Inverted Index', 'Ranking Service (PageRank + ML)', 'Query Service', 'Autocomplete Service', 'CDN', 'Cache Layer'],
            tradeoffs: ['Freshness vs index quality', 'Recall vs precision', 'Pre-computed vs real-time ranking']
        },
        {
            id: 'hld-7',
            title: 'Design a Ride-Sharing Service',
            difficulty: 'hard',
            tags: ['system-design', 'geospatial', 'real-time'],
            statement: `Design a ride-sharing service like Uber/Lyft. Support ride matching, real-time location tracking, pricing, payments, and driver/rider management.`,
            requirements: {
                functional: ['Request ride (pickup, destination)', 'Match with nearby drivers', 'Real-time ride tracking', 'Dynamic pricing (surge)', 'Rating system', 'Payment processing'],
                nonFunctional: ['Match within 30 seconds', 'Location updates every 3-5 seconds', '10M+ concurrent rides', 'High availability']
            },
            estimations: { rides: '~20M rides/day', drivers: '~5M active drivers', locations: '~100K location updates/sec' },
            keyComponents: ['Location Service (QuadTree/GeoHash)', 'Trip Service', 'Matching Service', 'Pricing Service', 'Payment Service', 'Notification Service', 'Map/ETA Service'],
            tradeoffs: ['QuadTree vs GeoHash for spatial indexing', 'Push vs pull for driver locations', 'Precomputed ETAs vs real-time computation']
        },
        {
            id: 'hld-8',
            title: 'Design a Video Streaming Platform',
            difficulty: 'hard',
            tags: ['system-design', 'cdn', 'encoding', 'streaming'],
            statement: `Design a video streaming platform like YouTube/Netflix. Support video upload, transcoding, adaptive streaming, recommendations, and content delivery to millions of concurrent viewers.`,
            requirements: {
                functional: ['Video upload and processing', 'Adaptive bitrate streaming', 'Video recommendations', 'Search and discovery', 'Comments and likes', 'Subscriptions'],
                nonFunctional: ['Start playing within 2 seconds', '100M+ DAU', 'Support 4K streaming', '99.99% availability', 'Global content delivery']
            },
            estimations: { uploads: '~500 hours of video/min', storage: '~1EB total', bandwidth: '~100Tbps peak' },
            keyComponents: ['Upload Service', 'Transcoding Pipeline', 'CDN (Edge servers)', 'Video Player (ABR)', 'Recommendation Engine', 'Search Service', 'User Service', 'Analytics Pipeline'],
            tradeoffs: ['Push vs pull CDN', 'Pre-transcoding all formats vs on-demand', 'Collaborative filtering vs content-based recommendations']
        },
        {
            id: 'hld-9',
            title: 'Design an E-Commerce Platform',
            difficulty: 'hard',
            tags: ['system-design', 'microservices', 'transactions'],
            statement: `Design an e-commerce platform like Amazon. Support product catalog, search, cart management, order processing, inventory management, and payment handling.`,
            requirements: {
                functional: ['Product catalog with search/filters', 'Shopping cart', 'Order placement and tracking', 'Inventory management', 'Payment processing', 'Reviews and ratings'],
                nonFunctional: ['Handle flash sales (100x traffic)', 'Strong consistency for inventory', '99.99% availability', 'Sub-second search results']
            },
            estimations: { products: '~500M products', orders: '~50K orders/sec peak', users: '~300M active users' },
            keyComponents: ['Product Service', 'Search Service (Elasticsearch)', 'Cart Service', 'Order Service', 'Inventory Service', 'Payment Service', 'Notification Service', 'CDN for product images'],
            tradeoffs: ['Microservices vs monolith', 'SAGA vs 2PC for distributed transactions', 'Optimistic vs pessimistic inventory locking']
        },
        {
            id: 'hld-10',
            title: 'Design a Distributed Cache',
            difficulty: 'hard',
            tags: ['system-design', 'distributed-systems', 'caching'],
            statement: `Design a distributed caching system like Redis/Memcached. Support key-value storage, TTL, eviction policies, replication, and cluster management across multiple nodes.`,
            requirements: {
                functional: ['GET/SET/DELETE operations', 'TTL and expiration', 'Eviction policies (LRU, LFU)', 'Data structures (strings, lists, sets, hashes)', 'Pub/Sub messaging', 'Atomic operations'],
                nonFunctional: ['Sub-millisecond latency', 'Linear scalability', 'High availability with replication', 'Support 1M+ operations/sec per node']
            },
            estimations: { nodes: '~1000 nodes in cluster', ops: '~1M ops/sec/node', memory: '~256GB per node' },
            keyComponents: ['Cache Node', 'Consistent Hashing Ring', 'Replication Manager', 'Cluster Coordinator', 'Client Library', 'Monitoring Service'],
            tradeoffs: ['Consistent hashing vs range partitioning', 'Synchronous vs async replication', 'Memory vs disk-backed storage']
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
        },
        {
            id: 'hr-6',
            title: 'Tell me about mentoring someone',
            difficulty: 'medium',
            tags: ['mentoring', 'leadership', 'growth'],
            statement: 'Tell me about a time you mentored or coached a junior team member. How did you approach it, and what impact did it have on their growth and productivity?',
            followUps: [
                'How did you identify their development areas?',
                'What teaching methods worked best?',
                'How did you balance mentoring with your own work?',
                'What did you learn from the experience?'
            ],
            evaluationCriteria: ['Shows investment in others', 'Adapts teaching approach', 'Demonstrates patience', 'Measures mentee growth']
        },
        {
            id: 'hr-7',
            title: 'Delivering under a tight deadline',
            difficulty: 'medium',
            tags: ['time-management', 'prioritization', 'pressure'],
            statement: 'Describe a time when you had to deliver a critical project under an extremely tight deadline. How did you manage your time, what trade-offs did you make, and what was the result?',
            followUps: [
                'How did you decide what to cut?',
                'Did you push back on the deadline?',
                'How did you keep the team motivated?',
                'What would you do differently next time?'
            ],
            evaluationCriteria: ['Shows structured prioritization', 'Makes pragmatic trade-offs', 'Communicates constraints clearly', 'Delivers results under pressure']
        },
        {
            id: 'hr-8',
            title: 'Cross-functional collaboration',
            difficulty: 'medium',
            tags: ['collaboration', 'communication', 'stakeholder'],
            statement: 'Tell me about a time you had to work closely with a non-engineering team (product, design, marketing, legal). How did you bridge the communication gap and align on goals?',
            followUps: [
                'How did you explain technical constraints?',
                'Were there competing priorities?',
                'How did you resolve disagreements?',
                'What process improvements resulted?'
            ],
            evaluationCriteria: ['Bridges technical and non-technical communication', 'Shows empathy for other perspectives', 'Drives alignment', 'Finds win-win solutions']
        },
        {
            id: 'hr-9',
            title: 'Going above and beyond for a customer',
            difficulty: 'medium',
            tags: ['customer-obsession', 'initiative', 'impact'],
            statement: 'Tell me about a time you went above and beyond for a customer or end-user. What was the situation, what did you do, and what was the impact?',
            followUps: [
                'How did you identify the customer need?',
                'Was this outside your normal responsibilities?',
                'How did others react to your initiative?',
                'How did you measure the customer impact?'
            ],
            evaluationCriteria: ['Shows customer empathy', 'Takes initiative beyond requirements', 'Quantifies impact', 'Balances customer needs with business goals']
        },
        {
            id: 'hr-10',
            title: 'Handling a technical disagreement',
            difficulty: 'hard',
            tags: ['technical-leadership', 'conflict', 'decision-making'],
            statement: 'Describe a time you strongly disagreed with a technical decision made by your team or a senior engineer. How did you handle the situation, and what was the outcome?',
            followUps: [
                'What data did you use to support your position?',
                'Did you escalate? Why or why not?',
                'How did you respond if the decision went against you?',
                'What did you learn about influencing technical decisions?'
            ],
            evaluationCriteria: ['Uses data and evidence', 'Disagrees respectfully', 'Commits after decision is made', 'Shows technical depth and judgment']
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
