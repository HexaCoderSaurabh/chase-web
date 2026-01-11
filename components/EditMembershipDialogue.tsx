import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Cross, Edit } from "lucide-react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditMembershipDialogue({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const handleClickOpen = () => {
    onOpenChange(true);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  type Member = {
    name: string;
    phone: string;
    membershipType: "Basic" | "Standard" | "Premium";
    subscriptionStart: string;
    subscriptionEnd: string;
    amountPaid: number;
    ptAmountPaid: number;
    ptAmountDue: number;
    isActive: boolean;
  };

  const [editingMember, setEditingMember] = React.useState<Member>({
    name: "",
    phone: "",
    membershipType: "Basic",
    subscriptionStart: "",
    subscriptionEnd: "",
    amountPaid: 0,
    ptAmountPaid: 0,
    ptAmountDue: 0,
    isActive: true,
  });

  const handleInputChange = <K extends keyof Member>(key: K, value: Member[K]) => {
    setEditingMember((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateMember = () => {
    // implement update logic (API call / state lift-up) as needed
    console.log("Updated member", editingMember);
    onOpenChange(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#111827" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Edit />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Member Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        {editingMember && (
          <Box p={4} maxWidth={800} mx="auto">
            <Grid container spacing={3}>
              {/* Name */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Name"
                  data-testid="modal-name-input"
                  value={editingMember.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </Grid>

              {/* Phone */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  data-testid="modal-phone-input"
                  value={editingMember.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </Grid>

              {/* Membership Type */}
              <Grid size={12}>
                <TextField
                  select
                  fullWidth
                  label="Membership Type"
                  data-testid="modal-membership-type-select"
                  value={editingMember.membershipType}
                  onChange={(e) =>
                    handleInputChange("membershipType", e.target.value as Member["membershipType"])
                  }
                >
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                </TextField>
              </Grid>

              {/* Subscription Dates */}
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Subscription Start"
                  InputLabelProps={{ shrink: true }}
                  data-testid="modal-subscription-start-input"
                  value={editingMember.subscriptionStart}
                  onChange={(e) =>
                    handleInputChange("subscriptionStart", e.target.value)
                  }
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Subscription End"
                  InputLabelProps={{ shrink: true }}
                  data-testid="modal-subscription-end-input"
                  value={editingMember.subscriptionEnd}
                  onChange={(e) =>
                    handleInputChange("subscriptionEnd", e.target.value)
                  }
                />
              </Grid>

              {/* Amount Paid */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount Paid (Subscription)"
                  data-testid="modal-amount-paid-input"
                  value={editingMember.amountPaid}
                  onChange={(e) =>
                    handleInputChange("amountPaid", Number(e.target.value) || 0)
                  }
                />
              </Grid>

              {/* PT Amounts */}
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="PT Amount Paid"
                  data-testid="modal-pt-amount-paid-input"
                  value={editingMember.ptAmountPaid}
                  onChange={(e) =>
                    handleInputChange(
                      "ptAmountPaid",
                      Number(e.target.value) || 0
                    )
                  }
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="PT Amount Due"
                  data-testid="modal-pt-amount-due-input"
                  value={editingMember.ptAmountDue}
                  onChange={(e) =>
                    handleInputChange(
                      "ptAmountDue",
                      Number(e.target.value) || 0
                    )
                  }
                />
              </Grid>

              {/* Active Status */}
              <Grid size={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editingMember.isActive}
                      onChange={(e) =>
                        handleInputChange("isActive", e.target.checked)
                      }
                      data-testid="modal-active-status-switch"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#000",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#000",
                          },
                        "& .MuiSwitch-track": {
                          backgroundColor: "#9ca3af", // gray when off
                        },
                      }}
                    />
                  }
                  label="Active Member"
                />
              </Grid>

              {/* Footer Buttons */}
              <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  data-testid="modal-cancel-btn"
                  sx={{
                    color: "black",
                    borderColor: "black",
                    "&:hover": {
                      borderColor: "black",
                      backgroundColor: "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Dialog>
    </React.Fragment>
  );
}
