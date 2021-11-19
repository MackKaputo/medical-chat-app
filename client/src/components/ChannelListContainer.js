import React from 'react'
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

export default function ChannelListContainer() {

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

  return (
    <>
        <SideBar logout={logout}/>
        <div className="channel-list__list__wrapper">
            <CompanyHeader />
            <ChannelSearch />
            <ChannelList
                filters = {{}}
                channelRenderFilterFn={() => {}}
                List = {(listProps) => ( /* Custom list implementation */
                    <TeamChannelList
                        {...listProps}
                        type="team" /** for team messages! not direct messages */
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview
                        {...previewProps}
                        type="team"
                    />
                )} 
            />

            <ChannelList
                filters = {{}}
                channelRenderFilterFn={() => {}}
                List = {(listProps) => ( /* Custom list implementation */
                    <TeamChannelList
                        {...listProps}
                        type="messaging" 
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview
                        {...previewProps}
                        type="messaging"
                    />
                )} 
            />
        </div>
    </>
  )
}
