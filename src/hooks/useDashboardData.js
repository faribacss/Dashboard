import { GetAllPost } from "@/services/posts";

// Days of the week constant
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// weekly data function
export function generateWeeklyData(posts) {
  const weeklyMap = DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day] = {
      TotalPageviews: 8,
      PublishedPosts: 0,
      ActiveAuthors: new Set(),
      week: day,
    };
    return acc;
  }, {});

  // If no posts exist, return default data
  if (!posts || posts.length === 0) {
    return DAYS_OF_WEEK.map((day) => ({
      TotalPageviews: 8,
      PublishedPosts: 0,
      ActiveAuthors: 0,
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
    ActiveAuthors: weeklyMap[day].ActiveAuthors.size,
    week: day,
  }));
}

// monthly data function (By Day of Month - 30 days)
export function generateMonthlyData(posts) {
  const currentDate = new Date();
  const daysInMonth = 30; // Assuming last 30 days for simplicity

  const monthlyMap = new Map();
  const dateOptions = { day: "numeric", month: "short" }; // Example format: "Dec 13"

  // Initialize map for the last 30 days
  for (let i = daysInMonth - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    const dateKey = date.toLocaleDateString(undefined, dateOptions); // Key like "Dec 13"
    monthlyMap.set(dateKey, {
      TotalPageviews: 0, // Default value like weekly
      PublishedPosts: 0,
      ActiveAuthors: new Set(),
      date: dateKey,
    });
  }

  // If no posts exist, return default data
  if (!posts || posts.length === 0) {
    // Return initialized map as array, ordered by date (oldest to newest)
    const sortedKeys = Array.from(monthlyMap.keys()).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    return sortedKeys.map((key) => monthlyMap.get(key));
  }

  // Process posts to fill monthlyMap
  posts.forEach((post) => {
    const postDate = new Date(post.createdAt || post.publishedAt);
    const dateKey = postDate.toLocaleDateString(undefined, dateOptions); // Key like "Dec 13"

    // Only process posts within the last 30-day window
    if (monthlyMap.has(dateKey)) {
      const data = monthlyMap.get(dateKey);
      data.PublishedPosts += 1;
      data.TotalPageviews += post.views || post.pageviews || 0;
      if (post.author) {
        data.ActiveAuthors.add(post.author).size;
      }
    }
  });

  // Convert to array, ordered by date (oldest to newest)
  const sortedKeys = Array.from(monthlyMap.keys()).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  return sortedKeys.map((key) => {
    const data = monthlyMap.get(key);
    return {
      ...data,
      ActiveAuthors: data.ActiveAuthors.size,
    };
  });
}

// Value formatter
export function valueFormatter(value) {
  return `${value}`;
}

// Bar chart settings for Weekly view
export const barChartSettings = {
  yAxis: [
    {
      label: "Weekly",
      min: 0,
      max: 12,
      tickInterval: 2,
    },
  ],
  height: 400,
  margin: { top: 20, bottom: 50 },
};

// Bar chart settings for Monthly view
export const monthlyBarChartSettings = {
  yAxis: [
    {
      label: "Monthly",
      min: 0,
      max: 12, // You might need a higher max value for monthly
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
  const ActiveAuthors = posts
    ? [...new Set(posts.map((post) => post.author).filter(Boolean))].length
    : 0;

  // Calculate total pageviews
  const totalPageviews =
    posts?.reduce((acc, post) => {
      return acc + (post.views || post.pageviews || 0);
    }, 0) || 0;

  // Dynamic weekly data
  const weeklyDataset = generateWeeklyData(posts);

  // Dynamic monthly data
  const monthlyDataset = generateMonthlyData(posts);

  // Stats for cards
  const statsData = {
    totalPageviews,
    publishedPostsCount,
    ActiveAuthors,
  };

  return {
    posts,
    isLoading,
    error,
    refetch,
    statsData,
    weeklyDataset,
    monthlyDataset,
  };
}
