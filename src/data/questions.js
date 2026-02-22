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
            ],
            solution: {
                approach: 'Use the **Sliding Window** technique. Maintain a window with a running sum. Expand right, then shrink from left when sum >= target. Track the minimum window length.',
                code: `function minSubArrayLen(target, nums) {\n  let left = 0, sum = 0, minLen = Infinity;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      minLen = Math.min(minLen, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n  return minLen === Infinity ? 0 : minLen;\n}`,
                timeComplexity: 'O(n) — each element is visited at most twice',
                spaceComplexity: 'O(1) — only a few variables'
            }
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
            hiddenTests: [],
            solution: {
                approach: 'Use **DFS** returning height or -1 (unbalanced signal). At each node, check if |leftHeight - rightHeight| <= 1. Propagate -1 up if unbalanced.',
                code: `function isBalanced(root) {\n  function dfs(node) {\n    if (!node) return 0;\n    const left = dfs(node.left);\n    const right = dfs(node.right);\n    if (left === -1 || right === -1) return -1;\n    if (Math.abs(left - right) > 1) return -1;\n    return Math.max(left, right) + 1;\n  }\n  return dfs(root) !== -1;\n}`,
                timeComplexity: 'O(n) — visit each node once',
                spaceComplexity: 'O(h) — recursion stack depth'
            }
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
            hiddenTests: [],
            solution: {
                approach: "Use **Kahn's Algorithm** (BFS topological sort). Build adjacency list + in-degree array. Start with nodes having 0 in-degree. Process them, reducing neighbors' in-degree. If all nodes processed, no cycle.",
                code: `function canFinish(numCourses, prerequisites) {\n  const adj = Array.from({length: numCourses}, () => []);\n  const inDeg = new Array(numCourses).fill(0);\n  for (const [a, b] of prerequisites) {\n    adj[b].push(a);\n    inDeg[a]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numCourses; i++) {\n    if (inDeg[i] === 0) queue.push(i);\n  }\n  let count = 0;\n  while (queue.length) {\n    const node = queue.shift();\n    count++;\n    for (const next of adj[node]) {\n      if (--inDeg[next] === 0) queue.push(next);\n    }\n  }\n  return count === numCourses;\n}`,
                timeComplexity: 'O(V + E) — process each vertex and edge once',
                spaceComplexity: 'O(V + E) — adjacency list + in-degree array'
            }
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
        },
        {
            id: 'dsa-7',
            title: 'Two Sum',
            difficulty: 'easy',
            tags: ['arrays', 'hash-map'],
            statement: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`. You may assume each input has exactly one solution.`,
            constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
            examples: [
                { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
                { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
            ],
            expectedOutline: 'Hash map: store complement → index. For each num, check if complement exists.',
            pitfalls: ['Using same element twice', 'Not handling negative numbers'],
            rubricHints: { optimal: 'O(n) with hash map', suboptimal: 'O(n^2) with nested loops' },
            hiddenTests: [],
            solution: {
                approach: 'Use a **Hash Map** to store each number\'s index. For each element, check if `target - num` exists in the map.',
                code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n}`,
                timeComplexity: 'O(n) — single pass through array',
                spaceComplexity: 'O(n) — hash map storage'
            }
        },
        {
            id: 'dsa-8',
            title: 'Valid Parentheses',
            difficulty: 'easy',
            tags: ['stack', 'strings'],
            statement: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type and in the correct order.`,
            constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only'],
            examples: [
                { input: 's = "()"', output: 'true' },
                { input: 's = "()[]{}"', output: 'true' },
                { input: 's = "(]"', output: 'false' }
            ],
            expectedOutline: 'Stack-based: push opening brackets, pop and match on closing brackets.',
            pitfalls: ['Empty stack when trying to pop', 'Leftover elements in stack at end'],
            rubricHints: { optimal: 'O(n) with stack', suboptimal: 'O(n^2) with string replacement' },
            hiddenTests: [],
            solution: {
                approach: 'Use a **Stack**. Push opening brackets. On closing brackets, pop and verify match. Return stack is empty at end.',
                code: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const c of s) {\n    if ('({['.includes(c)) stack.push(c);\n    else if (stack.pop() !== map[c]) return false;\n  }\n  return stack.length === 0;\n}`,
                timeComplexity: 'O(n) — single pass',
                spaceComplexity: 'O(n) — stack storage'
            }
        },
        {
            id: 'dsa-9',
            title: 'Merge K Sorted Lists',
            difficulty: 'hard',
            tags: ['linked-list', 'heap', 'divide-conquer'],
            statement: `You are given an array of \`k\` linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.`,
            constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4'],
            examples: [
                { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
                { input: 'lists = []', output: '[]' }
            ],
            expectedOutline: 'Min-heap: add first node from each list, extract min, add next node from same list.',
            pitfalls: ['Empty lists in input', 'Heap comparison for equal values', 'Not handling single list case'],
            rubricHints: { optimal: 'O(N log k) with min-heap', suboptimal: 'O(Nk) merging one by one' },
            hiddenTests: [],
            solution: {
                approach: 'Use a **Min-Heap** (priority queue) of size k. Extract minimum node, add its next to heap. Also solvable with divide-and-conquer merge.',
                code: `function mergeKLists(lists) {\n  // Divide and conquer approach:\n  if (!lists.length) return null;\n  while (lists.length > 1) {\n    const merged = [];\n    for (let i = 0; i < lists.length; i += 2) {\n      const l1 = lists[i], l2 = lists[i+1] || null;\n      merged.push(mergeTwoLists(l1, l2));\n    }\n    lists = merged;\n  }\n  return lists[0];\n}`,
                timeComplexity: 'O(N log k) where N = total nodes',
                spaceComplexity: 'O(log k) for recursion'
            }
        },
        {
            id: 'dsa-10',
            title: 'Container With Most Water',
            difficulty: 'medium',
            tags: ['arrays', 'two-pointers', 'greedy'],
            statement: `Given n non-negative integers \`height\` where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container that holds the most water.`,
            constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
            examples: [
                { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
                { input: 'height = [1,1]', output: '1' }
            ],
            expectedOutline: 'Two pointers from both ends. Move the shorter pointer inward. Area = min(h1,h2) * width.',
            pitfalls: ['Moving both pointers', 'Not tracking maximum', 'Off-by-one width'],
            rubricHints: { optimal: 'O(n) two pointers', suboptimal: 'O(n^2) brute force' },
            hiddenTests: [],
            solution: {
                approach: 'Use **Two Pointers** from edges. Always move the shorter side inward — moving the taller side can only decrease area.',
                code: `function maxArea(height) {\n  let l = 0, r = height.length - 1, max = 0;\n  while (l < r) {\n    max = Math.max(max, Math.min(height[l], height[r]) * (r - l));\n    if (height[l] < height[r]) l++;\n    else r--;\n  }\n  return max;\n}`,
                timeComplexity: 'O(n) — single pass',
                spaceComplexity: 'O(1) — constant space'
            }
        },
        {
            id: 'dsa-11',
            title: 'Word Search in Grid',
            difficulty: 'medium',
            tags: ['backtracking', 'matrix', 'dfs'],
            statement: `Given an m x n grid of characters \`board\` and a string \`word\`, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontal or vertical). The same cell may not be used more than once.`,
            constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15'],
            examples: [
                { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
                { input: 'board = [["A","B"],["C","D"]], word = "ABDC"', output: 'true' }
            ],
            expectedOutline: 'DFS backtracking from each cell. Mark visited, explore 4 directions, unmark on backtrack.',
            pitfalls: ['Not unmarking cells on backtrack', 'Checking bounds incorrectly', 'Starting from wrong cells'],
            rubricHints: { optimal: 'O(m*n*4^L) backtracking', suboptimal: 'No significantly better approach' },
            hiddenTests: [],
            solution: {
                approach: '**DFS Backtracking** from each cell. Mark cells as visited during recursion, restore on backtrack.',
                code: `function exist(board, word) {\n  const m = board.length, n = board[0].length;\n  function dfs(i, j, k) {\n    if (k === word.length) return true;\n    if (i < 0 || i >= m || j < 0 || j >= n) return false;\n    if (board[i][j] !== word[k]) return false;\n    const temp = board[i][j];\n    board[i][j] = '#';\n    const found = dfs(i+1,j,k+1) || dfs(i-1,j,k+1) || dfs(i,j+1,k+1) || dfs(i,j-1,k+1);\n    board[i][j] = temp;\n    return found;\n  }\n  for (let i = 0; i < m; i++)\n    for (let j = 0; j < n; j++)\n      if (dfs(i, j, 0)) return true;\n  return false;\n}`,
                timeComplexity: 'O(m * n * 4^L) where L = word length',
                spaceComplexity: 'O(L) — recursion depth'
            }
        },
        {
            id: 'dsa-12',
            title: 'Trapping Rain Water',
            difficulty: 'hard',
            tags: ['arrays', 'stack', 'two-pointers', 'dynamic-programming'],
            statement: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
            constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
            examples: [
                { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
                { input: 'height = [4,2,0,3,2,5]', output: '9' }
            ],
            expectedOutline: 'Two pointers or prefix max arrays. Water at each position = min(leftMax, rightMax) - height.',
            pitfalls: ['Not computing both left and right maximums', 'Edge cases with flat terrain'],
            rubricHints: { optimal: 'O(n) two pointers', suboptimal: 'O(n) with extra space for prefix arrays' },
            hiddenTests: [],
            solution: {
                approach: 'Use **Two Pointers** — track left and right max. Process from lower side.',
                code: `function trap(height) {\n  let l = 0, r = height.length - 1;\n  let leftMax = 0, rightMax = 0, water = 0;\n  while (l < r) {\n    if (height[l] < height[r]) {\n      leftMax = Math.max(leftMax, height[l]);\n      water += leftMax - height[l++];\n    } else {\n      rightMax = Math.max(rightMax, height[r]);\n      water += rightMax - height[r--];\n    }\n  }\n  return water;\n}`,
                timeComplexity: 'O(n) — single pass',
                spaceComplexity: 'O(1) — constant space'
            }
        },
        {
            id: 'dsa-13',
            title: 'Median of Two Sorted Arrays',
            difficulty: 'hard',
            tags: ['binary-search', 'arrays', 'divide-conquer'],
            statement: `Given two sorted arrays \`nums1\` and \`nums2\` of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).`,
            constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000', '1 <= m + n <= 2000'],
            examples: [
                { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0' },
                { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5' }
            ],
            expectedOutline: 'Binary search on the smaller array to find the correct partition.',
            pitfalls: ['Edge cases with empty arrays', 'Off-by-one partition', 'Handling odd vs even total length'],
            rubricHints: { optimal: 'O(log(min(m,n))) binary search', suboptimal: 'O(m+n) merge and find' },
            hiddenTests: [],
            solution: {
                approach: 'Binary search on the **smaller array** to find a partition where left elements are ≤ right elements.',
                code: `function findMedianSortedArrays(nums1, nums2) {\n  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];\n  const m = nums1.length, n = nums2.length;\n  let lo = 0, hi = m;\n  while (lo <= hi) {\n    const i = (lo + hi) >> 1;\n    const j = ((m + n + 1) >> 1) - i;\n    const l1 = i > 0 ? nums1[i-1] : -Infinity;\n    const r1 = i < m ? nums1[i] : Infinity;\n    const l2 = j > 0 ? nums2[j-1] : -Infinity;\n    const r2 = j < n ? nums2[j] : Infinity;\n    if (l1 <= r2 && l2 <= r1) {\n      if ((m+n) % 2) return Math.max(l1, l2);\n      return (Math.max(l1,l2) + Math.min(r1,r2)) / 2;\n    } else if (l1 > r2) hi = i - 1;\n    else lo = i + 1;\n  }\n}`,
                timeComplexity: 'O(log(min(m,n))) — binary search on smaller array',
                spaceComplexity: 'O(1) — constant space'
            }
        },
        {
            id: 'dsa-14',
            title: 'Number of Islands',
            difficulty: 'medium',
            tags: ['graphs', 'bfs', 'dfs', 'matrix'],
            statement: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
            constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300'],
            examples: [
                { input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' }
            ],
            expectedOutline: 'DFS/BFS from each unvisited "1", mark all connected "1"s as visited.',
            pitfalls: ['Not marking visited cells', 'Diagonal connections (should not count)', 'Grid boundary checks'],
            rubricHints: { optimal: 'O(m*n) DFS/BFS', suboptimal: 'Union-Find also O(m*n)' },
            hiddenTests: [],
            solution: {
                approach: 'Iterate grid. On each "1", increment count and **DFS** to sink all connected land.',
                code: `function numIslands(grid) {\n  let count = 0;\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === '1') {\n        count++;\n        dfs(grid, i, j);\n      }\n    }\n  }\n  return count;\n}\nfunction dfs(grid, i, j) {\n  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return;\n  if (grid[i][j] !== '1') return;\n  grid[i][j] = '0';\n  dfs(grid, i+1, j); dfs(grid, i-1, j);\n  dfs(grid, i, j+1); dfs(grid, i, j-1);\n}`,
                timeComplexity: 'O(m * n) — visit each cell once',
                spaceComplexity: 'O(m * n) — worst case recursion depth'
            }
        },
        {
            id: 'dsa-15',
            title: 'Maximum Subarray (Kadane\'s)',
            difficulty: 'medium',
            tags: ['arrays', 'dynamic-programming', 'greedy'],
            statement: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
            constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
            examples: [
                { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'Subarray [4,-1,2,1] has the largest sum 6.' },
                { input: 'nums = [1]', output: '1' }
            ],
            expectedOutline: 'Kadane\'s algorithm: track current sum and max sum. Reset current sum when it goes negative.',
            pitfalls: ['All negative numbers case', 'Confusing with subarray product', 'Initial values'],
            rubricHints: { optimal: 'O(n) Kadane\'s', suboptimal: 'O(n log n) divide and conquer' },
            hiddenTests: [],
            solution: {
                approach: '**Kadane\'s Algorithm** — maintain running sum. If sum goes negative, reset to 0. Track global maximum.',
                code: `function maxSubArray(nums) {\n  let curr = nums[0], max = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    curr = Math.max(nums[i], curr + nums[i]);\n    max = Math.max(max, curr);\n  }\n  return max;\n}`,
                timeComplexity: 'O(n) — single pass',
                spaceComplexity: 'O(1) — constant space'
            }
        },
        {
            id: 'dsa-16',
            title: 'Serialize and Deserialize Binary Tree',
            difficulty: 'hard',
            tags: ['trees', 'bfs', 'dfs', 'design'],
            statement: `Design an algorithm to serialize and deserialize a binary tree. Serialization is converting a tree to a string. Deserialization is reconstructing the tree from the string.`,
            constraints: ['The number of nodes in the tree is in the range [0, 10^4]'],
            examples: [
                { input: 'root = [1,2,3,null,null,4,5]', output: '"1,2,null,null,3,4,null,null,5,null,null"' }
            ],
            expectedOutline: 'Pre-order DFS with null markers. Serialize with commas, deserialize with queue/index.',
            pitfalls: ['Not handling null nodes', 'Delimiter collisions', 'Stack overflow on deep trees'],
            rubricHints: { optimal: 'O(n) pre-order DFS', suboptimal: 'O(n) BFS level-order' },
            hiddenTests: [],
            solution: {
                approach: '**Pre-order DFS** traversal with null markers. Serialize: visit node, recurse left/right. Deserialize: read values in order.',
                code: `function serialize(root) {\n  if (!root) return 'null';\n  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);\n}\nfunction deserialize(data) {\n  const vals = data.split(',');\n  let i = 0;\n  function build() {\n    if (vals[i] === 'null') { i++; return null; }\n    const node = new TreeNode(parseInt(vals[i++]));\n    node.left = build();\n    node.right = build();\n    return node;\n  }\n  return build();\n}`,
                timeComplexity: 'O(n) — visit each node once',
                spaceComplexity: 'O(n) — string storage + recursion'
            }
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
