// @flow

import _ from "lodash"

const allowed = "abcdefghijklmnopqrstuvwxyz0123456789"

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const isUpper = (char: string): boolean => _.includes(upper, char)

const isAllowed = (char: string): boolean => _.includes(allowed, char)

const encodeUpper = (char: string): string => "u" + char.toLowerCase()

const encodeSymbol = (char: string): string =>
  char === "/" ? "-" : "c" + char.charCodeAt()

const encodeChar = (char: string): string =>
  isUpper(char) ? encodeUpper(char) : encodeSymbol(char)

const maybeEncode = (char: string): string =>
  isAllowed(char) ? char : encodeChar(char)

const removeLeadingSlash = (path: string): string => _.trimStart(path, "/")

const mapMaybeEncode = (path: string): string =>
  _.map(path, maybeEncode).join("")

const convertPathToId = _.flow([removeLeadingSlash, mapMaybeEncode])
