import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import CardMedia from "@mui/material/CardMedia";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const repoName = process.env.REACT_APP_REPO_NAME;
  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        mt={2}
      >
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox title="User Count" subtitle={0} />
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox title="Alog Count" subtitle={0} />
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox title="High Score" subtitle={0} />
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox title="Value Here" subtitle={0} />
          </Box>
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={8} m="25px 0 0 0">
          <Card>
            <CardMedia
              sx={{ height: 400 }}
              image="https://www.simplilearn.com/ice9/free_resources_article_thumb/BackTracking%20Algorithm%20-%20Soni/state-space-tree-in-backtracking-algorithm.png"
              title="green iguana"
            />
          </Card>
        </Grid>

        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box maxHeight="100vh" overflow="auto" m="25px 0 0 0">
            <Grid xs={12}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  color: colors.grey[100],
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "20px 30px",
                  backgroundColor: colors.primary[400],
                }}
              >
                Go to Algorithms
              </Button>
            </Grid>

            <Grid xs={12}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  color: colors.grey[100],
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "20px 30px",
                  backgroundColor: colors.primary[400],
                }}
              >
                Start Quiz
              </Button>
            </Grid>

            <Grid xs={12}>
              <NavLink to={`/${repoName}/leaderboard`}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    color: colors.grey[100],
                    fontSize: "20px",
                    fontWeight: "bold",
                    padding: "20px 30px",
                    backgroundColor: colors.primary[400],
                  }}
                >
                  Show Toppers
                </Button>
              </NavLink>
            </Grid>

            <Grid xs={12}>
              <NavLink to={`/${repoName}/about`}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    color: colors.grey[100],
                    fontSize: "20px",
                    fontWeight: "bold",
                    padding: "20px 30px",
                    backgroundColor: colors.primary[400],
                  }}
                >
                  About Us
                </Button>
              </NavLink>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
