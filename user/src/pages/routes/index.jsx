import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useRoadRouteContext } from "../../hooks/useRoadRouteContext";
import RouteTableMap from "./RouteTableMap";
import { useNavigate } from "react-router-dom";

function Routes() {
  const { roadRoutes } = useRoadRouteContext();

  const navigate = useNavigate();
  const columns = [
    {
      field: "rId",
      headerName: "ID",
      width: 90,
      flex: 0.25,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => <div>{params.row.startLocation.name.replace(/, UK$/, '')}</div>,
    },
    {
      field: "stations",
      headerName: "Stations",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div>
          {params.row.stations.map((station) => (
            <div key={`${station.id} ${station.lat} ${station.lng}`}>
              {station.id}
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "prices",
      headerName: "Prices",
      width: 90,
      flex: 0.1,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div>
          {params.row.stations.map((station) => (
            <div key={`${station.id} ${station.lat} ${station.lng}`}>
              {station.price}
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "distance",
      headerName: "Distance",
      width: 90,
      flex: 0.1,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div>
          {params.row.stations.map((station) => (
            <div key={`${station.id} ${station.lat} ${station.lng}`}>
              {station.distance}
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "map",
      headerName: "Map",
      width: 90,
      flex: 1,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div className="w-full h-full py-[10px] ">
          <RouteTableMap
            googleRoutes={params.row.googleRoute}
            stations={params.row.stations}
            startLocation={params.row.startLocation}
          />
        </div>
      ),
    },
    {
      field: "buy",
      headerName: "Buy",
      width: 90,
      flex: 0.1,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div className="w-full h-full py-[10px] items-center justify-center flex">
          <button
            className="text-white font-robot text-[14px] bg-main_blue px-[15px] py-[4px] rounded-lg"
            onClick={() => {
              navigate("/journey/" + params.row._id);
            }}
          >
            Buy
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="lg:mx-[30px]  px-[15px] mb-[60px] mt-[30px]">
      <p className="text-main_blue xsm:text-[37px] text-[30px]  font-semibold font-barlows  mb-[15px] leading-6">
        Read this carefully
      </p>
      <div
        className="text-justify xsm:text-[18px] text-[15px]"
        style={{ lineHeight: "normal" }}
      >
        <p>
        At the University Transport Management System, we're committed to supporting your journey towards a brighter future. As the leaders of tomorrow, it's essential to make wise and responsible use of the resources available to you. Remember, you hold the key to unlocking your success. Currently, we operate a fleet of 15 buses, providing convenient and reliable transportation across our three university campuses. To travel on our buses, please ensure you have a valid single ticket or a season ticket for a seamless experience.


        </p>
      </div>
      <div className="overflow-x-scroll mt-[20px]">
        <div className="lg:w-full w-[1400px]">
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={roadRoutes}
              columns={columns}
              rowHeight={400}
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 6,
                  },
                },
              }}
              slots={{
                toolbar: GridToolbar,
                //pagination: CustomPagination,
              }}
              //showColumnVerticalBorder={true}
              showCellVerticalBorder={true}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  fontFamily: "Barlow Semi Condensed",
                  fontSize: "18px",
                  fontWeight: "400",
                  backgroundColor: "#002147",
                  color: "#fff",
                  // border: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "#fff",
                  color: "#000",
                  fontFamily: "roboto",
                  fontSize: "16px",
                  fontWeight: "500",
                },
                // "& .MuiDataGrid-footerContainer": {
                //   backgroundColor: "#fff",
                //   paddingRight: "45%",
                // },
                "& .MuiDataGrid-toolbarContainer": {
                  backgroundColor: "#fff",
                  //center the toolbar
                  //paddingLeft: "10%",

                  "& .MuiButton-text": {
                    color: "#002147",
                  },
                },
                //remove cell horizontal border
                "& .MuiDataGrid-cell": {
                  //borderBottom: "none",
                },
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Routes;
