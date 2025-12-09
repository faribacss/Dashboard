import { GetAllPost } from "@/services/posts";

// Days of the week constant
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// weekly data function
export function generateWeeklyData(posts) {
  const weeklyMap = DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day] = {
      TotalPageviews: 8,
      PublishedPosts: 0,
      ActiveAuthors: 6,
      // ActiveAuthors: new Set(),
      week: day,
    };
    return acc;
  }, {});

  // If no posts exist, return default data
  if (!posts || posts.length === 0) {
    return DAYS_OF_WEEK.map((day) => ({
      TotalPageviews: 8,
      PublishedPosts: 0,
      ActiveAuthors: 6,
      week: day,
    }));
  }

  // process posts to fill weeklyMap
  posts.forEach((post) => {
    const postDate = new Date(post.createdAt || post.publishedAt);
    const dayName = DAYS_OF_WEEK[postDate.getDay()];

    if (weeklyMap[dayName]) {
      weeklyMap[dayName].PublishedPosts += 1;
      weeklyMap[dayName].TotalPageviews += post.views || post.pageviews || 0;
      if (post.author) {
        weeklyMap[dayName].ActiveAuthors.add(post.author);
      }
    }
  });

  // Convert to array starting from Saturday
  const orderedDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  return orderedDays.map((day) => ({
    TotalPageviews: weeklyMap[day].TotalPageviews,
    PublishedPosts: weeklyMap[day].PublishedPosts,
    ActiveAuthors: weeklyMap[day].ActiveAuthors,
    week: day,
  }));
}

// Value formatter
export function valueFormatter(value) {
  return `${value}`;
}

// Bar chart settings
export const barChartSettings = {
  yAxis: [
    {
      label: "Times",
      min: 0,
      max: 12,
      tickInterval: 2,
    },
  ],
  height: 400,
  margin: { top: 20, bottom: 50 },
};

// Main hook for dashboard data
export function useDashboardData() {
  const { data: posts, isLoading, error, refetch } = GetAllPost();

  // Calculate the number of published posts
  const publishedPostsCount = posts?.length || 0;

  // Calculate unique authors
  const uniqueAuthors = posts
    ? [...new Set(posts.map((post) => post.author).filter(Boolean))].length
    : 0;

  // Calculate total pageviews
  const totalPageviews =
    posts?.reduce((acc, post) => {
      return acc + (post.views || post.pageviews || 0);
    }, 0) || 0;

  // Dynamic weekly data
  const weeklyDataset = generateWeeklyData(posts);

  // Dynamic chart data
  const chartData = [
    { label: "Total Pageviews", value: totalPageviews || 8, color: "#6BA3D6" },
    {
      label: "Published Posts",
      value: publishedPostsCount || 1,
      color: "#F9A8D4",
    },
    { label: "Active Authors", value: uniqueAuthors || 1, color: "#86EFAC" },
  ];

  // Stats for cards
  const statsData = {
    totalPageviews,
    publishedPostsCount,
    uniqueAuthors,
  };

  return {
    posts,
    isLoading,
    error,
    refetch,
    chartData,
    statsData,
    weeklyDataset,
  };
}
