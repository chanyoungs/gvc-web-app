import Enzyme, { mount } from "enzyme"
import EnzymeAdapter from "enzyme-adapter-react-16"
import React from "react"
import { useDispatch } from "react-redux"

import { ThunkActionCustom } from "../../store/actions/types"
import { createNotice } from "./../../store/actions/noticeActions"
import { NoticeCreator } from "./NoticeCreator"

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
})

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockReturnValue(mockDispatch),
}))

jest.mock("../../types/actions", () => ({
  createNotice: jest.fn((x) => x),
}))

// const mockUseDispatch = useDispatch as jest.Mock
// const mockCreateNotice = createNotice as jest.Mock
// const mockDispatch = jest.fn(() =>
//   mockCreateNotice({ title: 'new title', content: 'new content' })
// )

describe("<NoticeCreator />", () => {
  // mockUseDispatch.mockReturnValue(mockDispatch)

  const container = mount(<NoticeCreator />)

  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot()
  })

  it("should have an title field", () => {
    expect(
      container.find('[data-testid="title"] input[type="text"]').length
    ).toEqual(1)
  })

  it("should have an content field", () => {
    expect(
      container.find('[data-testid="content"] textarea').length
    ).toBeGreaterThan(1)
  })

  it("should set the title value on change event", () => {
    container
      .find('[data-testid="title"] input[type="text"]')
      .simulate("change", {
        target: {
          value: "some new title",
        },
      })

    expect(
      container.find('[data-testid="title"] input[type="text"]').prop("value")
    ).toBe("some new title")
  })

  it("should set the content value on change event", () => {
    container
      .find('[data-testid="content"] textarea')
      .at(0)
      .simulate("change", {
        target: {
          value: "some new content",
        },
      })

    expect(
      container.find('[data-testid="content"] textarea').at(0).prop("value")
    ).toBe("some new content")
  })

  it("should call the add notice function on submit button click", () => {
    container
      .find('[data-testid="title"] input[type="text"]')
      .simulate("change", {
        target: {
          value: "some new title",
        },
      })
    container
      .find('[data-testid="content"] textarea')
      .at(0)
      .simulate("change", {
        target: {
          value: "some new content",
        },
      })

    container.find('button[type="button"]').simulate("click")

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    //dispatch 제대로 호출됐는지 체크 with argument
    expect(mockDispatch).toHaveBeenCalledWith(
      createNotice({ title: "new title", content: "new content" })
    )

    expect(
      container.find('[data-testid="content"] textarea').at(0).prop("value")
    ).toBe("")

    expect(
      container.find('[data-testid="title"] input[type="text"]').prop("value")
    ).toBe("")
  })
})
