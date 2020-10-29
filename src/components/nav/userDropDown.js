import React, { useContext } from 'react'
import { Menu, Dropdown } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { UserContext } from '../../store/userContext'
import { useHistory } from 'react-router'
import { useLogout } from '../../helpers/authToken'
import { generateInitials } from '../../helpers/helpers'

function UserDropDown() {
    const { user, dispatch } = useContext(UserContext)
    const history = useHistory()
    const logout = useLogout()

    const first_name = user.user ? user.user.first_name : null
    const last_name = user.user ? user.user.last_name : null
    const user_id = user.user ? user.user.id : null
    const userInitials = user.user ? generateInitials(first_name, last_name) : null

    // handle State changes
    const handleLogout = async () => {
        await dispatch({ type: 'LOGOUT' })
        await logout()
        history.push('/login')
    }

    const menu = (
        <Menu>
            <Menu.Item
                key="0"
                onClick={() => {
                    history.push('/profile')
                }}
            >
                <div className="menu-drop-btn">Profile</div>
            </Menu.Item>
            <Menu.Item
                key="1"
                onClick={() => {
                    history.push(`/user/${user_id}/posts`)
                }}
            >
                <div className="menu-drop-btn">My Posts</div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" onClick={handleLogout}>
                <div className="menu-drop-btn">Log out</div>
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown overlay={menu} trigger={['click']} arrow>
            <button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <div className="nav-avatar">
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                        {userInitials}
                    </Avatar>
                </div>
            </button>
        </Dropdown>
    )
}

export default UserDropDown
