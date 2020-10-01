import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btn: {
    marginRight: theme.spacing(1),
  },
  formLabel: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
    minWidth: "100%",
  },
}));

const Form = (props) => {
  const { seed_kits, gardens } = props.data;
  const classes = useStyles();
  const [userSeedKit, setUserSeedKit] = React.useState("");
  const [userGardens, setUserGardens] = React.useState([]);

  let allGardens = Object.keys(gardens).map((garden) => {
    return gardens[garden];
  });

  const handleChange = (event) => {
    const selectedKit = event.target.value;
    const kit = seed_kits[selectedKit];

    let updatedGardens = allGardens.filter((garden) => {
      const minPods = Math.min.apply(null, kit.pods);
      return (
        garden.wattage >= kit.min_wattage &&
        garden.grow_height >= kit.min_grow_height &&
        garden.pods >= minPods
      );
    });

    setUserGardens([...updatedGardens]);
    setUserSeedKit(selectedKit);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={6} lg={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>What type of plant would you like to grow?</InputLabel>
            <Select onChange={handleChange} value={userSeedKit}>
              {Object.keys(seed_kits).map((kit, index) => {
                return (
                  <MenuItem key={index} value={kit}>
                    {seed_kits[kit].name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {userSeedKit && (
            <>
              <FormLabel component="legend" className={classes.formLabel}>
                What garden would you like?
              </FormLabel>
              {userGardens.map((garden, index) => {
                return (
                  <Button
                    key={index}
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                  >
                    {garden.name}
                  </Button>
                );
              })}
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
