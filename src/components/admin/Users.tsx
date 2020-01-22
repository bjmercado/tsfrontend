import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Content from './layouts/Content';
import { inject, observer } from 'mobx-react';

import { IUsers } from '../../store/UserStore';
import { UserProps } from '../../props/UserProps';
import Modal from '../notifications/Modal';


const Users: React.FunctionComponent<UserProps> = ({userStore}): JSX.Element => {
  const [data, setData] = React.useState(false);
  const [content, setContent] = React.useState({
    description: '',
    content: (): any => {}
  });

  React.useEffect(() => {
    const loadUsers = async () => {
      const data = await userStore!.getUsers();
      userStore!.users = data;
    } 
    loadUsers();
  }, []);

  const addModal = (): void => {
    setData(true);
    setContent({
      description: 'ADD USER',
      content: (): any => {
        return(
          <form onSubmit={(e) => addUser(e)} autoComplete="off">
            <TextField
              required={true}
              autoFocus
              margin="dense"
              id="nickname"
              name="nickname"
              label="Nickname"
              fullWidth
              onChange={(e) => handleChage(e)}
            />

            <TextField
              required={true}
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              onChange={(e) => handleChage(e)}
            />

            <TextField
              required={true}
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => handleChage(e)}
            />

            <DialogActions>
              <Button onClick={() => closeModal()} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>    
        </form>
        );
      }
    });
  };

  const showModal = async (id: number): Promise<void> => {
    const data = await userStore!.viewUser(id);
    userStore!.nickNameContainer = data.user_nickname;
    userStore!.emailContainer = data.user_email;
    setData(true);
    setContent({
      description: 'UPDATE USER',
      content: (): any => {
        return(
          <form onSubmit={(e) => updateUser(e, id)} autoComplete="off">
            <TextField
              required={true}
              autoFocus
              margin="dense"
              id="nicknames"
              name="nicknames"
              label="Nickname"
              fullWidth
              value={userStore!.nickNameContainer}
              onChange={(e) => handleChage(e)}
            />

            <TextField
              required={true}
              margin="dense"
              id="emails"
              name="emails"
              label="Email Address"
              type="email"
              fullWidth
              onChange={(e) => handleChage(e)}
            />

            <DialogActions>
              <Button onClick={() => closeModal()} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>    
        </form>
        );
      }
    });

  }

  const deleteModal = (id: number): void => {
    setData(true);
    setContent({
      description: 'Are you sure you want to permanently delete this record?',
      content: (): any => {
        return(
            <DialogActions>
              <Button onClick={() => closeModal()} color="primary">
                Cancel
              </Button>
              <Button 
                type="button" 
                color="secondary"
                onClick={() => removeUsers(id)}>
                Delete
              </Button>
            </DialogActions>
        );
      }
    });
  }

  const closeModal = (): void => {
    setData(false);
  };

  const renderUsers = (data: IUsers[]) => {
    return data.map((item: Omit<IUsers, 'user_password'>, index: number) => {
        return(
          <TableRow key={index}>
            <TableCell>{item.user_nickname}</TableCell>
            <TableCell>{item.user_email}</TableCell>
            <TableCell>{item.role}</TableCell>
            <TableCell>
              <Button onClick={() => showModal(item.id)}>
                <EditIcon color="primary"/>
              </Button>
              <Button onClick={() => deleteModal(item.id)}>
                <DeleteIcon color="secondary"/>
              </Button>
            </TableCell>
          </TableRow>
        );
      })
  }

  const addUser = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
    e.preventDefault();
    await userStore!.addUsers();
    closeModal();
  }

  const updateUser = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    userStore!.updateUsers(id);
  }

  const removeUsers = async (id: number): Promise<void> => {
    await userStore!.deleteUsers(id);
    closeModal();
  }

  const handleChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    console.log(e.target.name);
    switch(e.currentTarget.name){
      case 'nickname':
        userStore!.nickNameContainer = e.currentTarget.value;
        break;
      case 'email':
        userStore!.emailContainer = e.currentTarget.value;
        break;
      case 'password':
        userStore!.passwordContainer = e.currentTarget.value;
        break;
      default:
        break;
    }
  }

  return (
    <Content>
        <Grid container spacing={3}>
            <Grid item style={{float: 'right'}} xs={3}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => addModal()}
              >Add</Button>
            </Grid>

            <Grid item xs={12}>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nickname</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {renderUsers(userStore!.users)}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
        </Grid>
      <Modal
        open={data}
        close={closeModal}
        description={content.description}
        content={content.content}>
      </Modal>
    </Content>
  );
}

export default inject('userStore')(observer(Users));