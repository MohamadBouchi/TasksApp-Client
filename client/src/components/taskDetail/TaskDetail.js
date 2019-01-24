import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import './taskDetail.css';
import HorizontalTimeline from 'react-horizontal-timeline';

const sql=`
select distinct
   a.nl as "NL",
   d.ekg as "EKG",
   b.hkdnr as "Kd.-Nr.",
   e.name1 as "Name1",
   e.name2 as "Name2",
   e.strasse as "Strasse",
   e.plz as "PLZ",
   e.ort as "Ort",
   e.liefname1 as "LiefName1",
   e.liefname2 as "LiefName2",
   e.liefstrasse as "LiefStrasse",
   e.liefplz as "LiefPLZ",
   e.liefort as "LiefOrt",
   sum(case when (c.ekhwg in (100, 200)) then a.gumsatz else 0 end) as "FF",
   sum(case when (a.pfk = 34) then a.gumsatz else 0 end) as "Tchibo",
   sum(case when (c.ekhwg in (7200, 7300, 7600)) then a.gumsatz else 0 end) as "GKT",
   sum(case when (c.ekhwg = 5300) then a.gumsatz else 0 end) as "Tabak",
   sum(case when (c.ekhwg = 9400) then a.gumsatz else 0 end) as "Strecke",       
   sum(case when (c.ekhwg = 3000) then a.gumsatz else 0 end) as "Obst + Gemüse",
   sum(case when (c.ekhwg  not in (100, 200, 3000, 5300, 7200, 7300, 7600, 9400)) and (a.pfk not in 34) then a.gumsatz else 0 end) as "Restumsatz"
from gvp2_basis.fakturierdaten a
join gvp2_basis.kundenstamm_statistik b on a.kdnr = b.kdnr
join gvp2_basis.artikelstamm_zusatz_statistik c on a.artnr = c.artnr
left outer join gvp2_basis.kdekgzuordnung_statistik d on a.kdnr = d.kdnr
join (select hkdnr,
         name1,
         name2,
         strasse,
         plz,
         ort,
         liefname1,
         liefname2,
         liefstrasse,
         liefplz,
         liefort
   from gvp2_basis.kundenstamm_statistik where isthkdnr = 'j') e on b.hkdnr = e.hkdnr      
where (d.typkz = 'M' or b.hkdnr in (12007860, 10435052, 08006797))
  and b.admnr not in (91, 95, 96)
  and a.cckz = 'G'
  and a.nl in (8, 10, 11, 12, 13, 14, 50, 51)
  and c.ekhwg <> 9800
  and c.laenderkz = 'DE'
  and a.datekey between 20181201 and 20181231
  and (d.ekg in (99000459, 99000456) or b.hkdnr in (12007860, 10435052, 08006797))
group by a.nl, d.ekg, b.hkdnr, e.name1, e.name2, 
     e.strasse, e.plz, e.ort, e.liefname1, e.liefname2, 
     e.liefstrasse, e.liefplz, e.liefort

order by a.nl, b.hkdnr

`
const styles1 = theme => ({
    success: {
      backgroundColor: green[600],
    },
    icon: {
        fontSize: 20,
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
  });
  function MySnackbarContent(props) {
    const { classes, className, message, variant, ...other } = props;
    const Icon = CheckCircleIcon;
  
    return (
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        {...other}
      />
    );
  }
  
  MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    variant: PropTypes.oneOf(['success']).isRequired,
  };
  const VALUES = [ '2019-01','2019-02','2019-03' ];
  const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);
class ScrollDialog extends React.Component {

  state = {
    open: false,
    scroll: 'paper',
    id: '',
    title: '',
    loading: true,
    status: '',
    value: 0,
    valueTimeline: 0, 
    previous: 0,
    openSnackbar: false,
    userName: ''
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleClickOpen = (id) => {
    this.setState({ open: true, id });
    const request = {
        query: `
        query{
          taskDetail(id:"${id}")
          {
            status
            taskId{
                title
            }
            userId{
              userName
            }
          }
        }
        `
      };
    fetch('http://10.10.11.70:3000/graphql', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
        "Content-Type": "application/json"
        }
    }).then(data => {
            return data.json();
        }).then(res => {
            this.setState({
                title: res.data.taskDetail[0].taskId.title,
                loading: false,
                status: res.data.taskDetail[0].status,
                userName: res.data.taskDetail[0].userId.userName,
            })
        })
        .catch(err => {
            console.log(err)
        });
  };

  handleClose = () => {
    this.setState({ open: false, loading: true });
  };
  handleCloseSnackbar = () => {

    this.setState({ openSnackbar: false });
  };
  render() {
    if(!this.state.loading) {
        return (
            <div className='taskDetail'>
                <Dialog
                maxWidth='md'
                open={this.state.open}
                onClose={this.handleClose}
                scroll={this.state.scroll}
                aria-labelledby="scroll-dialog-title">
                    <DialogTitle id="scroll-dialog-title">{this.state.title}</DialogTitle>
                    
                    <DialogContent>
                        <Tabs
                            value={this.state.value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={this.handleChange}>
                            <Tab label="Details" />
                            <Tab label="Sql" />
                        </Tabs>
                        {this.state.value === 0 && <div style={{ width: '100%', height: '70px', margin: '0 auto' }}>
                        <HorizontalTimeline
                        style={{ background: 'white', foreground: 'white', outline: '#dfdfdf' }}
            index={this.state.valueTimeline}
            indexClick={(index) => {
              this.setState({ valueTimeline: index, previous: this.state.valueTimeline });
            }}
            values={ VALUES } /></div>}
            
                        {this.state.value === 0 && <Typography inline={true} component="div" style={{ padding: 8 * 3 }}>
                        <div className='text-center'>  <form className='taskDetail__form' style={{display: 'flex',
    flexWrap: 'wrap'}}noValidate autoComplete="off">
                        <TextField
          id="standard-read-only-input"
          label="Status"
          defaultValue={this.state.status}
          style={{marginLeft:'10px',marginRight:'10px'}}
          error
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Changed by"
          defaultValue={this.state.userName}
          style={{marginLeft:'10px',marginRight:'10px'}}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Notice"
          style={{marginLeft:'10px',marginRight:'10px'}}
          fullWidth
        />
        </form></div>
                        </Typography>}
                        {this.state.value === 1 && 
                        <CopyToClipboard text={sql} onCopy={() => this.setState({ openSnackbar: true})}>
                        <Paper>
                             <Typography inline={true} component="pre" style={{ padding: 8 * 3 }}>
                             {sql}
                            </Typography>
                            <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.openSnackbar}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}

        >
        <MySnackbarContentWrapper
            variant="success"
            message="Sql has been copied !"
          /></Snackbar>
                         </Paper>
                        </CopyToClipboard>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    else return (<React.Fragment></React.Fragment>)
  }
}

export default ScrollDialog;