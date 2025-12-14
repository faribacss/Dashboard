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

import {
  useDashboardData,
  valueFormatter,
  barChartSettings,
  monthlyBarChartSettings,
} from "@/hooks/useDashboardData";
import { DeletePostById } from "@/services/posts";
import { showDeleteConfirm } from "@/utilities/showEditDeleteToast";
import getLangProps from "@/utilities/getLangFontClass";
import CalendarComponent from "@/components/Calendar";
import { SaveInfoContext } from "@/context/SaveInfo";
import { useContext } from "react";

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
  const { user } = useContext(SaveInfoContext);
  return (
    <TableRow className={styles.tableRow} hover onClick={postSelectedHandler}>
      <TableCell component="th" scope="row">
        {post.title?.substring(0, 50) + "..." || t("dashboard.noTitle")}
      </TableCell>
      <TableCell align="center">{user?.username || "-"}</TableCell>
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

  const [chartView, setChartView] = React.useState("weekly"); // 'weekly' or 'monthly'

  const {
    posts,
    isLoading,
    error,
    statsData,
    refetch,
    weeklyDataset,
    monthlyDataset,
  } = useDashboardData();

  const { totalPageviews, publishedPostsCount, uniqueAuthors } = statsData;

  const currentDataset =
    chartView === "weekly" ? weeklyDataset : monthlyDataset;
  const currentSettings =
    chartView === "weekly" ? barChartSettings : monthlyBarChartSettings;
  const dataKey = chartView === "weekly" ? "week" : "date";

  return (
    <Container className={styles.mainContainer}>
      <Box className={styles.statsBox}>
        <Grid className={styles.gridContainer}>
          <Grid className={styles.gridItem}>
            <div className={styles.statValue}>
              <p>{t("dashboard.totalPageviews")}</p>
              {isLoading ? "..." : totalPageviews}
            </div>
            <div>
              <IconButton>
                <VisibilityIcon className={styles.icon} />
              </IconButton>
            </div>
          </Grid>
          <Grid className={styles.gridItem}>
            <div className={styles.statValue}>
              <p>{t("dashboard.publishedPosts")}</p>
              {isLoading ? "..." : publishedPostsCount}
            </div>
            <IconButton>
              <BorderColorIcon className={styles.icon} />
            </IconButton>
          </Grid>
          <Grid className={styles.gridItem}>
            <div className={styles.statValue}>
              <p>{t("dashboard.activeAuthors")}</p>
              {isLoading ? "..." : uniqueAuthors}
            </div>
            <IconButton>
              <PeopleAltIcon className={styles.icon} />
            </IconButton>
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
            <Stack
            className={styles.stackBtn}
              direction="row"
              spacing={1}
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "flex-end",
                position: "relative",
                top: "35px",
                right: "30%",
              }}
            >
              <Button
                variant={chartView === "weekly" ? "contained" : "text"}
                onClick={() => setChartView("weekly")}
                sx={{
                  backgroundColor: "#F9A8D4",
                  color: "black",
                  opacity: chartView === "weekly" ? 1 : 0.4,
                  "&:hover": {
                    backgroundColor: "#F9A8D4",
                    transition: "all 0.3s ease-in",
                  },
                }}
              >
                {t("dashboard.weeklyChart")}{" "}
              </Button>
              <Button
                variant={chartView === "monthly" ? "contained" : "text"}
                onClick={() => setChartView("monthly")}
                sx={{
                  backgroundColor: "#ff6a64",
                  color: "black",
                  opacity: chartView === "monthly" ? 1 : 0.4,
                  "&:hover": {
                    backgroundColor: "#ff6a64",
                    transition: "all 0.3s ease-in",
                  },
                }}
              >
                {t("dashboard.monthlyChart")}{" "}
              </Button>
            </Stack>

            <BarChart
              dataset={currentDataset}
              xAxis={[{ scaleType: "band", dataKey: dataKey }]}
              series={[
                {
                  dataKey: "TotalPageviews",
                  label: t("dashboard.totalPageviews"),
                  valueFormatter,
                  color: "#FF6A64",
                },
                {
                  dataKey: "PublishedPosts",
                  label: t("dashboard.publishedPosts"),
                  valueFormatter,
                  color: "#F9A8D4",
                },
                {
                  dataKey: "ActiveAuthors",
                  label: t("dashboard.activeAuthors"),
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
              {...currentSettings}
            />
          </Box>
          {/* list of Posts */}
          <Grid>
            <div className={styles.listTitleHead}>
              <h1>Latest Post</h1>
            </div>
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
                    <TableCell align="center">
                      {t("dashboard.author")}
                    </TableCell>
                    <TableCell align="center">
                      {t("dashboard.actions")}
                    </TableCell>
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
                      <Row
                        key={post.id}
                        post={post}
                        onDeleteSuccess={refetch}
                      />
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
        </Grid>
      </Box>
      {/* <Grid className={styles.calendarGrid}>
        <CalendarComponent />
      </Grid> */}
    </Container>
  );
}
