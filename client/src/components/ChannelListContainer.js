import React, { useState } from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

// initialize cookie instance
const cookies = new Cookies()

const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>

    </div>
)

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text"> Medical Pager </p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
}


const ChannelListContent = ({
    isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer
}) => {

    const { client } = useChatContext()

    const logout = () => {
        cookies.remove("token")
        cookies.remove("userId")
        cookies.remove("username")
        cookies.remove("fullName")
        cookies.remove("avatarURL")
        cookies.remove("hashedPassword")
        cookies.remove("phoneNumber")

        window.location.reload()
    }

    const filters = {members: {$in: [client.userID]}}

  return (
    <>
        <SideBar logout={logout}/>
        <div className="channel-list__list__wrapper">
            <CompanyHeader />
            <ChannelSearch setToggleContainer={setToggleContainer}/>
            <ChannelList
                filters = {filters}
                channelRenderFilterFn={customChannelTeamFilter}
                List = {(listProps) => ( /* Custom list implementation */
                    <TeamChannelList
                        {...listProps}
                        type="team" /** for team messages! not direct messages */
                        isCreating={isCreating} 
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview
                        {...previewProps}
                        type="team"
                        setToggleContainer={setToggleContainer}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                    />
                )} 
            />

            <ChannelList
                filters = {filters}
                channelRenderFilterFn={customChannelMessagingFilter}
                List = {(listProps) => ( /* Custom list implementation */
                    <TeamChannelList
                        {...listProps}
                        type="messaging"
                        isCreating={isCreating} 
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview
                        {...previewProps}
                        type="messaging"
                        setToggleContainer={setToggleContainer} 
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}

                    />
                )} 
            />
        </div>
    </>
  )
}

const ChannelListContainer = ({setCreateType, setIsEditing, setIsCreating}) => {
    const [toggleContainer, setToggleContainer] = useState(false)

    return (
        <>
            <div className="channel-list__container">
                {/* Desktop version */}
                <ChannelListContent
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setIsCreating={setIsCreating}
                />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer? "0%" : "-89%", backgroundColor: "#3800a0"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>

                </div>

                {/* Mobile version */}
                <ChannelListContent
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setIsCreating={setIsCreating}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    )
}

export default ChannelListContainer