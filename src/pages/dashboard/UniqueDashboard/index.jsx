import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

// material-ui
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Box,
  Grid,
  Container,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import PostAddIcon from "@mui/icons-material/PostAdd";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// style
import styles from "@/pages/dashboard/UniqueDashboard/UniqueDashboard.module.css";

// داده‌های مشترک داشبورد
import {
  useDashboardData,
  valueFormatter,
  barChartSettings,
  generateWeeklyData,
} from "@/hooks/useDashboardData";
import { DeletePostById } from "@/services/posts";
import { showDeleteConfirm } from "@/utilities/showEditDeleteToast";
import getLangProps from "@/utilities/getLangFontClass";
import CalendarComponent from "@/components/Calendar";

// Post Table
function Row({ post, onDeleteSuccess }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const deletePostMutation = DeletePostById(post.documentId);

  const postSelectedHandler = () => {
    navigate(`/post/${post.documentId}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-post/${post.documentId}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    showDeleteConfirm({
      t,
      onConfirm: () => {
        deletePostMutation.mutate(undefined, {
          onSuccess: () => {
            if (onDeleteSuccess) onDeleteSuccess();
          },
        });
      },
    });
  };

  return (
    <TableRow className={styles.tableRow} hover onClick={postSelectedHandler}>
      <TableCell component="th" scope="row">
        {post.content?.substring(0, 50) + "..." || t("dashboard.noTitle")}
      </TableCell>
      <TableCell align="center">{post.createdBy?.username || "-"}</TableCell>
      <TableCell align="center">{post.author || "-"}</TableCell>
      <TableCell align="center">
        <Tooltip title={t("editPosts.edit")}>
          <IconButton className={styles.editIconBtn} onClick={handleEdit}>
            <EditIcon className={styles.editIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("editPosts.delete")}>
          <IconButton className={styles.deleteIconBtn} onClick={handleDelete}>
            <DeleteIcon className={styles.deleteIcon} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default function UniqueVisitorCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { fontClass } = getLangProps(styles);
  const createPostHandler = () => {
    navigate("/create-post");
  };
  // استفاده از hook مشترک داده‌ها
  const { posts, isLoading, error, chartData, statsData, refetch } =
    useDashboardData();

  const { totalPageviews, publishedPostsCount, uniqueAuthors } = statsData;

  return (
    <Container className={styles.mainContainer}>
      <Box className={styles.statsBox}>
        <Grid className={styles.gridContainer}>
          <Grid className={styles.gridItem}>
            {t("dashboard.totalPageviews")}
            <IconButton>
              <VisibilityIcon className={styles.icon} />
            </IconButton>
            <div className={styles.statValue}>
              {isLoading ? "..." : totalPageviews}
            </div>
          </Grid>
          <Grid className={styles.gridItem}>
            {t("dashboard.publishedPosts")}
            <IconButton>
              <BorderColorIcon className={styles.icon} />
            </IconButton>
            <div className={styles.statValue}>
              {isLoading ? "..." : publishedPostsCount}
            </div>
          </Grid>
          <Grid className={styles.gridItem}>
            {t("dashboard.activeAuthors")}
            <IconButton>
              <PeopleAltIcon className={styles.icon} />
            </IconButton>
            <div className={styles.statValue}>
              {isLoading ? "..." : uniqueAuthors}
            </div>
          </Grid>
          <Grid
            onClick={createPostHandler}
            className={`${styles.createBtn} ${styles["btnPulse"]} ${styles.gridItem}`}
          >
            {t("dashboard.createPost")}
            <IconButton>
              <PostAddIcon className={styles.createIcon} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.headerBox}>
        <Grid container spacing={2} className={styles.chartContainer}>
          <Box className={styles.barChart}>
            <h2 className={styles.chartTitle}>{t("dashboard.weeklyChart")}</h2>
            <BarChart
              dataset={generateWeeklyData(posts)}
              xAxis={[{ scaleType: "band", dataKey: "week" }]}
              series={[
                {
                  dataKey: "TotalPageviews",
                  label: "Total Pageviews",
                  valueFormatter,
                  color: "#6BA3D6",
                },
                {
                  dataKey: "PublishedPosts",
                  label: "Published Posts",
                  valueFormatter,
                  color: "#F9A8D4",
                },
                {
                  dataKey: "ActiveAuthors",
                  label: "Active Authors",
                  valueFormatter,
                  color: "#86EFAC",
                },
              ]}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                },
              }}
              {...barChartSettings}
            />
          </Box>
          <Box className={styles.pieChart}>
            <h2 className={styles.chartTitle}>{t("dashboard.review")}</h2>
            <Stack height={400} direction="column" alignItems="center">
              <PieChart
                series={[
                  {
                    startAngle: -90,
                    endAngle: 270,
                    paddingAngle: 3,
                    innerRadius: "50%",
                    outerRadius: "85%",
                    cornerRadius: 5,
                    cx: "50%",
                    cy: "45%",
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -10,
                      color: "gray",
                    },
                    data: chartData,
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "row",
                    position: { vertical: "bottom", horizontal: "center" },
                    padding: { top: 20 },
                  },
                }}
              />
            </Stack>
          </Box>
        </Grid>
      </Box>
      {/* list of Posts */}
      <Grid container spacing={2} className={styles.upperPostsContainer}>
        <Grid>
          <TableContainer
            className={`${styles.tableContainer} ${fontClass}`}
            component={Box}
          >
            <Table aria-label="posts table">
              <TableHead className={styles.tableHeaderBox}>
                <TableRow className={styles.tableHeader}>
                  <TableCell>{t("dashboard.postTitle")}</TableCell>
                  <TableCell align="center">
                    {t("dashboard.username")}
                  </TableCell>
                  <TableCell align="center">{t("dashboard.author")}</TableCell>
                  <TableCell align="center">{t("dashboard.actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      {t("dashboard.errorLoading")}
                    </TableCell>
                  </TableRow>
                ) : posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <Row key={post.id} post={post} onDeleteSuccess={refetch} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      {t("dashboard.noPosts")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid className={styles.calendarGrid}>
          <CalendarComponent />
        </Grid>
      </Grid>
    </Container>
  );
}
